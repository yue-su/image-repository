const { models } = require("../models")
const router = require("express").Router()

const { image, user } = models

router.get("/", (req, res) => {
  image
    .findAll({
      where: {
        private: false,
      },
      include: [user],
      order: [["createdAt", "DESC"]],
    })
    .then((images) => {
      res.status(200).json(images)
    })
    .catch((error) => {
      res.status(500).json({ Error: error })
    })
})

router.post("/", (req, res) => {
  image
    .bulkCreate(req.body)
    .then((images) => {
      res.status(200).json(images)
    })
    .catch((error) => {
      res.status(500).json({ Error: error })
    })
})

module.exports = router
