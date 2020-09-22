import express from 'express'

const router = express.Router()

router.get('/', (req, res, next) => {
	return res.json({ status: 200, message: 'Running OK.' })
})

// import categories from '../app/controllers/api/categories/index'
// router.use('/categories', categories)

// import collections from '../app/controllers/api/collections/index'
// router.use('/collections', collections)

// import currencies from '../app/controllers/api/currentcies/index'
// router.use('/currencies', currencies)

// import orders from '../app/controllers/api/order/index'
// router.use('/orders', orders)

// import product_colors from '../app/controllers/api/product_colors/index'
// router.use('/product-colors', product_colors)

// import product_sizes from '../app/controllers/api/product_sizes/index'
// router.use('/product-sizes', product_sizes)

// import product_stock_out from '../app/controllers/api/product_stock_out/index'
// router.use('/product-stock-out', product_stock_out)

// import product_stock_in from '../app/controllers/api/product_stock_in/index'
// router.use('/product-stock-in', product_stock_in)

// import products from '../app/controllers/api/products/index'
// router.use('/products', products)

// import stock_in_batches from '../app/controllers/api/stock_in_batches/index'
// router.use('/stock-in-batches', stock_in_batches)

import projects from '../app/controllers/api/projects/index'
router.use('/projects', projects)

import dictionaries from '../app/controllers/api/dictionaries/index'
router.use('/dictionaries', dictionaries)

import services from '../app/controllers/api/appService/index'
router.use('/services', services)

import service_status from '../app/controllers/api/serviceStatus/index'
router.use('/service-status', service_status)

import black_list from '../app/controllers/api/blackList/index'
router.use('/black-list', black_list)

router.all('*', (req, res, next) => {

	return res.status(404).json({ status: 404 })
})

// error handler in admin
router.use(function (err, req, res, next) {

	console.log('handle error: ', err);

	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = process.env.NODE_ENV === 'development' ? err : {}

	// render the error page
	res.status(err.status || 500)
	res.json(res.locals.error)
})

export default router