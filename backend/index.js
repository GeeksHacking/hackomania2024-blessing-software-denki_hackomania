const express = require('express')
const http = require("http")
const https = require("https")
const { Server } = require("socket.io");
const fs = require('fs')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

const httpServer = process.env.ENV == "DEV" ? http.createServer(app) : https.createServer({key: fs.readFileSync('./privkey.pem'), cert: fs.readFileSync('./cert.pem'), ca: fs.readFileSync('./chain.pem')}, app);
const io = new Server(httpServer)
app.use(cors())
app.use(bodyParser.json())
app.set('socket', io)

app.use('/api/iot', require('./routes/iot'))
app.use('/api/auth', require('./routes/auth'))

const port = '3000'
httpServer.listen(port, (err) => {
  if (err) return console.log(err)
  return console.log(`Server running on ${port}`)
})