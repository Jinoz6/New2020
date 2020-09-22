import url from 'url'
import createError from 'http-errors'

import { RateLimiterMySQL } from 'rate-limiter-flexible'

import mysqlClient from '../../../../config/connect'

import {getUserForValidatebyUsername} from '../../../models/User'

const maxWrongAttemptsByIPperDay = 100;
const maxConsecutiveFailsByUsernameAndIP = 10;

const limiterSlowBruteByIP = new RateLimiterMySQL({
    storeClient: mysqlClient.createPool,
    dbName: `rtlmtrflx_${process.env.APP_NAME}`,
    keyPrefix: 'login_fail_ip_per_day',
    points: maxWrongAttemptsByIPperDay,
    duration: 60 * 60 * 24,
    blockDuration: 60 * 60 * 24, // Block for 1 day, if 100 wrong attempts per day
})

const limiterConsecutiveFailsByUsernameAndIP = new RateLimiterMySQL({
    storeClient: mysqlClient.createPool,
    dbName: `rtlmtrflx_${process.env.APP_NAME}`,
    keyPrefix: 'login_fail_consecutive_username_and_ip',
    points: maxConsecutiveFailsByUsernameAndIP,
    duration: 60 * 60 * 24 * 90, // Store number for 90 days since first fail
    blockDuration: 60 * 60, // Block for 1 hour
  });

const getUsernameIPkey = (username, ip) => `${username}_${ip}`;

const LoginProtectionRoute = async (req, res, next, user, err_user) => {
    const ipAddr = req.ip;
    const usernameIPkey = getUsernameIPkey(req.body.username, ipAddr);

    const [resUsernameAndIP, resSlowByIP] = await Promise.all([
        limiterConsecutiveFailsByUsernameAndIP.get(usernameIPkey),
        limiterSlowBruteByIP.get(ipAddr),
    ]);

    let retrySecs = 0;

    // Check if IP or Username + IP is already blocked
    if (resSlowByIP !== null && resSlowByIP.consumedPoints > maxWrongAttemptsByIPperDay) {
        retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
    } else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > maxConsecutiveFailsByUsernameAndIP) {
        retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000) || 1;
    }

    if (retrySecs > 0) {
        
        return res.redirect('/login/locked?locked_username='+req.body.username)
        
    } else {

        if (user) {

            if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
                // Reset on successful authorisation
                await limiterConsecutiveFailsByUsernameAndIP.delete(usernameIPkey);
            }
				
            req.logIn(user, (err) => {

                if (err) {
                    return next(err)
                }
                
                if (req.query['redirect']) {
                    return res.redirect(req.query['redirect'])
                }

                return res.redirect('/admin')

            })

        } else {

            // Consume 1 point from limiters on wrong attempt and block if limits reached
            try {
                const promises = [limiterSlowBruteByIP.consume(ipAddr)];

                getUserForValidatebyUsername(req.body.username, async (errV, resultV) => {

                    if (errV) {
                        
                        return next(createError(errV))
        
                    } else {
        
                        if (resultV.length > 0) {
                            // Count failed attempts by Username + IP only for registered users
                            promises.push(limiterConsecutiveFailsByUsernameAndIP.consume(usernameIPkey));
                        }

                        await Promise.all(promises);
                        
                    }
                })

            } catch (rlRejected) {
                if (rlRejected instanceof Error) {
                    throw rlRejected;
                } else {
                    res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000)) || 1);
                    // res.status(429).send('Too Many Requests');
                    return res.redirect('/login/locked?locked_username='+req.body.username)
                }
            }

            if (err_user) {

                return res.redirect('/login?login-error=1')
            }

            let query = {}

            Object.keys(req.query).map(q => {
                query[q] = req.query[q]
            })

            query['error'] = 'auth-failed'

            return res.redirect(url.format({
                pathname: req.baseUrl,
                query: query
            }))
            
        }
        
    }
}

export default LoginProtectionRoute