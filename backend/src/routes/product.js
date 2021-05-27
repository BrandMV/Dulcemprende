const express = require('express')
const { requireSignin, adminMiddleware } = require('../common')
const router = express.Router()
const { createProduct, getProductsBySlug, getProductDetailsById } = require('../controller/product')
const multer = require('multer')
const shortid = require('shortid')
const path = require('path')


const storage = multer.diskStorage({ //usamos multer para almacenamiento
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),  'uploads')) //carpeta de productos
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })

const upload = multer({storage})


router.post('/product/create', requireSignin, adminMiddleware,upload.array('productPicture'), createProduct)
router.get('/product/:slug', getProductsBySlug)
router.get('/product/:productId', getProductDetailsById)

module.exports = router