function addAssociations(sequelize) {
  const { user, image } = sequelize.models

  user.hasMany(image)
  image.belongsTo(user)
}

module.exports = { addAssociations }
