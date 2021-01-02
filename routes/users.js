const { models } = require("../models")
const router = require("express").Router()
const bcryptjs = require("bcryptjs")
const { makeJwt } = require("../utils/makeJwt")

const { user } = models

router.post("/register", (req, res) => {
  const credentials = req.body

  if (Boolean(credentials.username && credentials.password)) {
    const rounds = process.env.HASH_ROUNDS || 4
    const hash = bcryptjs.hashSync(credentials.password, Number(rounds))
    credentials.password = hash

    user
      .create(credentials)
      .then((user) => {
        const token = makeJwt(user)
        res.status(201).json({ data: user, token })
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: "username and password are required",
    })
  }
})

router.post("/login", (req, res) => {
  const { username, password } = req.body

  if (Boolean(username && password)) {
    user
      .findOne({
        where: {
          username: username,
        },
      })
      .then((user) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = makeJwt(user)
          res.status(200).json({
            message: `welcome back ${user.username}`,
            data: {
              userId: user.id,
              username: user.username,
            },
            token,
          })
        } else {
          res.status(401).json({ message: "Invalid credentials" })
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({
      message: "please provide username and password",
    })
  }
})

module.exports = router
