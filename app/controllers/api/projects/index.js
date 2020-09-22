import express from 'express'
import createError from 'http-errors'

import * as project from '../../../models/api/project'

const router = express.Router()

router.get('/', (req, res, next) => {

    try {

        project.all((err, result) => {

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
            req.body.project_name &&
            req.body.location
        ) {

            project.insert(
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
            req.body.project_id
        ) {
            project.getById(
                req.body.project_id,
                (errData, resData) => {

                    if (errData) {
                        next(errData)
                    } else if (resData.length > 0) {

                        const data = {
                            project_name: req.body.project_name || resData[0].project_name,
                            location: req.body.location || resData[0].location,
                            project_id: req.body.project_id,
                        }

                        project.update(
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
            req.body.project_id
        ) {

            project.getById(
                req.body.project_id,
                (errId, resId) => {

                    if (errId) {
                        next(errId)
                    } else if (resId.length > 0) {

                        project.remove(
                            req.body.project_id,
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

