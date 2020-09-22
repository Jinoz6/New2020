import url from 'url'
import createError from 'http-errors'
import passport from 'passport'

import express from 'express'
const router = express.Router()

import LoginProtectionRoute from './LoginProtection'

/* GET home page. */
router.get('/', function(req, res, next) {

	if (req.isAuthenticated()) {
		return res.redirect('/admin')
	} else {
		res.render(
			'auth/login', 
			{ 
				title: 'ເຂົ້າສູ່ລະບົບ',
				params: {
					has_error: (req.query['login-error'] || req.query['error']) ? true : false
				}
			}
		)
	}

})

router.get('/locked', function(req, res, next) {

	if (req.isAuthenticated()) {
		return res.redirect('/admin')
	} else {

		return res.render(
			'auth/login_429', 
			{ 
				title: 'ເຂົ້າສູ່ລະບົບ',
				params: {
					locked_username: req.query['locked_username'] ? req.query['locked_username'] : ''
				}
			}
		)
	}

})

router.post('/', (req, res, next) => {

	passport.authenticate(
		'local',
		{session: true},
		async (err, user, info) => {

			try {
				await LoginProtectionRoute(req, res, next, user, err)
			} catch (error) {
				next(error)
			}

		}
	)(req, res, next)

})

export default router
