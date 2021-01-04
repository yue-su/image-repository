const { models } = require("../models")
const router = require("express").Router()
const sequelize = require("sequelize")

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

router.get("/:id", (req, res) => {
  image
    .findAll({
      where: sequelize.or(
        {
          userId: req.params.id,
        },
        { private: false }
      ),
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

router.delete("/", (req, res) => {
  image
    .destroy({
      where: {
        //here the req.body.id is an array of ids
        //such as [1, 2, 3]
        id: req.body.id,
      },
    })
    //the returned value could be 0 if the items are not found
    .then((numberOfDeleted) => {
      res.status(200).json(numberOfDeleted)
    })
    .catch((error) => {
      res.status(500).json({ Error: error })
    })
})

module.exports = router
