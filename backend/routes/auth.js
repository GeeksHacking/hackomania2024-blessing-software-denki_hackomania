const router = require('express').Router()
const { createUser, getUser, signInUser, } = require('../controllers/auth')

router.get('/getUser', getUser)
router.post('/createUser', createUser)
router.post('/signInUser', signInUser)

module.exports = router