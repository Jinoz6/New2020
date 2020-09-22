var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    return res.redirect('/login')
})

// import login from '../app/controllers/auth/login/index'
// router.use('/login', login)

// import logout from '../app/controllers/auth/logout/index'
// router.use('/logout', logout)

// import testorder from '../app/controllers/admin/testorder/index'
// router.use('/testorder', testorder)

export default router
