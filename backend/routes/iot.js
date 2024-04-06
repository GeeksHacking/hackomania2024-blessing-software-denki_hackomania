const router = require('express').Router()
const { createRecord } = require('../controllers/iot')

router.post('/createRecord', createRecord)

module.exports = router
