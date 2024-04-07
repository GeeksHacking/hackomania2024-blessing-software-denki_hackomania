const express = require('express')
const http = require("http")
const { Server } = require("socket.io");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const httpServer = http.createServer(app)
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