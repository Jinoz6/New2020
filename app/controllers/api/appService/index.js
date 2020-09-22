import express from 'express'
import createError from 'http-errors'

import * as service from '../../../models/api/appService'

const router = express.Router()

router.get('/', (req, res, next) => {

    try {

        service.all((err, result) => {

            if (err) {
                next(createError(500))
            } else if (result.length > 0) {

                return res.json({
                    status: 200,
                    data: result
                })

            } else {

                return res.json({
                    status: 404,
                    data: result
                })
            }
        })

    } catch (error) {
        next(error)
    }

})


router.post('/new', (req, res, next) => {

    try {

        if (
            req.body.project_id &&
            req.body.service_name
        ) {

            service.insert(
                req.body,
                (err, result) => {

                    if (err) {
                        next(createError(500))
                    } else {

                        return res.json({
                            status: 200,
                            message: "OK"
                        })
                    }
                }
            )

        } else {
            next(createError(400))
        }

    } catch (error) {
        next(error)
    }
})

router.put('/update', (req, res, next) => {

    try {
        if (
            req.body.service_id
        ) {
            service.getById(
                req.body.service_id,
                (errData, resData) => {

                    if (errData) {
                        next(errData)
                    } else if (resData.length > 0) {

                        const data = {
                            project_id: req.body.project_id || resData[0].projcet_id,
                            service_name: req.body.service_name || resData[0].service_name,
                            service_id: req.body.service_id,
                        }

                        service.update(
                            data,
                            (err, result) => {

                                if (err) {
                                    next(createError(500))
                                } else {

                                    return res.json({
                                        status: 200,
                                        message: "OK"
                                    })
                                }
                            }
                        )

                    } else {
                        next(createError(400))
                    }
                })

        } else {
            next(createError(400))
        }

    } catch (error) {
        next(error)
    }
})


router.delete('/delete/', (req, res, next) => {

    try {

        if (
            req.body.service_id
        ) {

            service.getById(
                req.body.service_id,
                (errId, resId) => {

                    if (errId) {
                        next(errId)
                    } else if (resId.length > 0) {

                        service.remove(
                            req.body.service_id,
                            (err, result) => {

                                if (err) {
                                    next(err)
                                } else {

                                    return res.json({
                                        status: 200,
                                        message: "OK"
                                    })
                                }
                            }
                        )

                    } else {
                        next(createError(400))
                    }
                }
            )

        } else {
            next(createError(400))
        }

    } catch (error) {
        next(error)
    }
})

export default router

