const router = require('express').Router()
const { createRecord, registerDevice } = require('../controllers/iot')

router.post('/createRecord', createRecord)
router.post('/registerDevice', registerDevice)

module.exports = router
