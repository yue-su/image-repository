const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const logger = require("morgan")

const server = express()

server.use(helmet())
server.use(express.json())
server.use(cors())
server.use(logger("dev"))

server.get("/api/ping", (req, res) => {
  res.status(200).json({ success: true })
})

const imagesRouter = require("./routes/images")

server.use("api/images", imagesRouter)

module.exports = server
