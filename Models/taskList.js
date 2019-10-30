var Sequelize = require('sequelize');
var sequelize = require('../connection/sequelizeCon');
var User = require('../Models/user');

var taskList = sequelize.define("TaskList", {
    name: Sequelize.STRING
  });

  User.hasMany(taskList,{
      onDelete: 'CASCADE',
      foreignKey: {
          allowNull : false
      }
  });

  taskList.belongsTo(User,{
    foreignKey: {
        allowNull : false
    }
 });
  sequelize.sync();
  module.exports = taskList;
