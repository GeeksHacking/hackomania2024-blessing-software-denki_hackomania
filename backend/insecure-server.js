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

const httpServer = http.createServer(app)
const io = new Server(httpServer)
app.use(cors())
app.use(bodyParser.json())
app.set('socket', io)

//app.use('/api/iot', require('./routes/iot'))
app.use('/api/auth', require('./routes/auth'))
app.post('/api/iot/createRecord', async (req, res) => {
  const { data, id } = req.body
  try {
    await fetch('https://blessingsoft.ddns.net:3000/api/iot/createRecord', {
      method: 'POST',
      body: JSON.stringify({data: data, id: id}),
      headers: {
        'content-type': 'application/json'
      },
    })
    res.sendStatus(200)
  } catch {
    res.sendStatus(500)
  }
})

const port = '3001'
httpServer.listen(port, (err) => {
  if (err) return console.log(err)
  return console.log(`Server running on ${port}`)
})