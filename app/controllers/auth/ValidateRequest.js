import createError from 'http-errors'

import { getUserForValidatebyUsername } from '../../models/User'

const Validate = (req, res, next) => {

    if (req.isAuthenticated()) {

        getUserForValidatebyUsername(req._passport.session.user, (err, result) => {

            if (err) {

                return next(createError(500))

            } else {

                if (result.length === 1) {

                    res.locals.username = req._passport.session.user

                    return next()

                } else {

                    return res.redirect('/login?err=true&&redirect=' + encodeURIComponent(req.originalUrl))

                }

            }

        })

    } else {

        return res.redirect('/login?redirect=' + encodeURIComponent(req.originalUrl))

    }

}

export default Validate