import express from 'express'
import createError from 'http-errors'

import * as whiteList from '../../../models/api/whiteList'

const router = express.Router()

router.get('/', (req, res, next) => {

    try {

        whiteList.all((err, result) => {

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
            req.body.ip_address
        ) {

            whiteList.insert(
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
            req.body.blist_id
        ) {
            whiteList.getById(
                req.body.blist_id,
                (errData, resData) => {

                    if (errData) {
                        next(errData)
                    } else if (resData.length > 0) {

                        const data = {
                            project_id: req.body.project_id || resData[0].proeject_id,
                            ip_address: req.body.ip_address || resData[0].ip_address,
                            mac_address: req.body.mac_address || resData[0].mac_address,
                            blist_id: req.body.blist_id,
                        }

                        whiteList.update(
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
            req.body.blist_id
        ) {

            whiteList.getById(
                req.body.blist_id,
                (errId, resId) => {

                    if (errId) {
                        next(errId)
                    } else if (resId.length > 0) {

                        whiteList.remove(
                            req.body.blist_id,
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

