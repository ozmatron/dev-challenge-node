

module.exports = function(sequelize, DataTypes) {
    var Images = sequelize.define("Images", {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      filename: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        }
    });
    return Images;
  };