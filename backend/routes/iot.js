const router = require('express').Router()
const { createRecord, registerDevice, getDevices } = require('../controllers/iot')

router.post('/createRecord', createRecord)
router.post('/registerDevice', registerDevice)
router.get('/getDevices', getDevices)

module.exports = router
