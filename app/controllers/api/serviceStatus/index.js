import express from 'express'
import createError from 'http-errors'

import * as service_status from '../../../models/api/serviceStatus'

const router = express.Router()

router.get('/', (req, res, next) => {

    try {

        service_status.all((err, result) => {

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
            req.body.service_id &&
            req.body.service_status &&
            req.body.db_connect_status
        ) {

            service_status.insert(
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
        console.log(req.body)
        if (
            req.body.status_id
        ) {
            service_status.getById(
                req.body.status_id,
                (errData, resData) => {

                    if (errData) {
                        next(errData)
                    } else if (resData.length > 0) {

                        const data = {
                            service_id: req.body.service_id || resData[0].service_id,
                            service_status: req.body.service_status || resData[0].service_status,
                            db_connect_status: req.body.db_connect_status || resData[0].db_connect_status,
                            cpu_load: req.body.cpu_load || resData[0].cpu_load,
                            ram_use: req.body.ram_use || resData[0].ram_use,
                            bandwidth: req.body.bandwidth || resData[0].bandwidth,
                            status_id: req.body.status_id,
                        }

                        service_status.update(
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
            req.body.status_id
        ) {

            service_status.getById(
                req.body.status_id,
                (errId, resId) => {

                    if (errId) {
                        next(errId)
                    } else if (resId.length > 0) {

                        service_status.remove(
                            req.body.status_id,
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
                        console.log(resId)

                        next(createError(400))
                    }
                }
            )

        } else {
            console.log(req.body.status_id)
            next(createError(400))
        }

    } catch (error) {
        next(error)
    }
})

export default router

