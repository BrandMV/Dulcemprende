const express = require('express')
const { requireSignin, userMiddleware } = require('../common-middleware');
const { addStatistics, getStatistics } = require('../controller/statistics');
const router = express.Router();

router.post('/user/statistics/create', requireSignin, userMiddleware, addStatistics)
router.post('/user/getStatistics', requireSignin, userMiddleware, getStatistics)

module.exports = router