import createError from 'http-errors'
import express from 'express'

const router = express.Router()

import ValidateRequest from '../app/controllers/auth/ValidateRequest'

router.use(ValidateRequest)

import dashboard_route from '../app/controllers/admin/dashboard/index'
router.use('/', dashboard_route)


// handle not found error in admin
router.all('*', (req, res, next) => {

    next(createError(404))
})

// error handler in admin
router.use(function(err, req, res, next) {
	
    // set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.render('admin/error_admin')
})

export default router
