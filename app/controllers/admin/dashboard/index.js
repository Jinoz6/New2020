import express from 'express'

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('admin/index', { title: 'ໜ້າຫຼັກ' })
})

export default router
