const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  })
}
