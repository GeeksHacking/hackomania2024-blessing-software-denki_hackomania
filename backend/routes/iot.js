const router = require('express').Router()
const { createRecord, registerDevice, getDevices, getSum } = require('../controllers/iot')

router.post('/createRecord', createRecord)
router.post('/registerDevice', registerDevice)
router.get('/getDevices', getDevices)
router.get('/getSum' , getSum)

module.exports = router
