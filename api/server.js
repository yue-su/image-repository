const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())

server.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true })
})

module.exports = server
