const bcrypt = require('bcrypt')
const { pool } = require('../config/database')
const jwt = require('jsonwebtoken')
const secret = process.env.NEXTAUTH_SECRET
const check = (plaintext, hash) => {
  return bcrypt.compareSync(plaintext, hash)
}

module.exports = {
  createUserService: async (email, password, username) => {
    try {
      const hash = bcrypt.hashSync(password, 10)
      const values = [email, hash, username]
      await pool.query('INSERT INTO iot_user(email, password, username) VALUES($1, $2, $3)', values)
      const token = jwt.sign({email: email, username: username}, secret)
      return token
    } catch (err) {
      console.log(err)
      throw err.detail
    }
  },
  signInUserService: async (email, password) => {
    try {
      const result = await pool.query('SELECT * FROM iot_user WHERE email = $1', [email])
      const user = result.rows[0]
      const valid = check(password, user.password)
      if (valid) {
        const token = jwt.sign({email: email, username: user.username}, secret)
        user.pwd = null
        return {user: user, token: token}
      } else {
        throw 401
      }
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  getUserService: async (email, username) => {
    const result = email != undefined ? pool.query('SELECT * FROM iot_user WHERE email = $1', [email]) : pool.query('SELECT * FROM iot_user WHERE username = $1', [username])
    return result
  },
}