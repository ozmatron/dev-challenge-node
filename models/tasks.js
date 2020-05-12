

module.exports = function(sequelize, DataTypes) {
  var Tasks = sequelize.define("Tasks", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    complete: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  });
  return Tasks;
};