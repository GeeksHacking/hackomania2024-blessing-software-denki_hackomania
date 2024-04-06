const { createUserService, getUserService, signInUserService } = require('../services/auth')
module.exports = {
  createUser: async (req, res) => {
    const { email, password, username } = req.body
    try {
      await createUserService(email, password, username)
      const result = await signInUserService(email, password)
      res.send(result)
    } catch (err) {
      res.sendStatus(500)
    }
  }, 
  getUser: async (req, res) => {
    const { email, username } = req.query
    const result = await getUserService(email, username)
    res.send(result)
  },

  signInUser: async (req, res) => {
    const { email, password } = req.body
    try {
      const result = await signInUserService(email, password)
      res.send(result)
    } catch (err) {
      if (err == 401) {
        res.sendStatus(401)
      } else {
        res.sendStatus(500)
      }
    }
  }
}