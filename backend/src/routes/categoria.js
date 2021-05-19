const express = require('express')
const { requireSignin, adminMiddleware } = require('../common')
const router = express.Router()
const { addCategory, getCategories } = require('../controller/category')

router.post('/category/create', requireSignin, adminMiddleware, addCategory)
router.get('/category/getCategory', getCategories)

module.exports = router