import express from 'express'
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {

	req.logout()
    res.redirect('/login')

});

export default router
