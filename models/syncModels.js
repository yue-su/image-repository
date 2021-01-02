function syncModels(sequelize) {
  const { user, image } = sequelize.models

  user
    .sync()
    .then(() => {
      console.log("user synced")
      image
        .sync()
        .then(() => {
          console.log("image synced")
        })
        .catch((err) => console.error(err))
    })
    .catch((err) => console.error(err))
}

module.exports = { syncModels }
