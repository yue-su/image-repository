const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
  sequelize.define("image", {
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    private: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  })
}
