var Sequelize = require('sequelize');
var sequelize = require('../connection/sequelizeCon');
var taskList = require('../Models/taskList');

var task = sequelize.define("Task", {
    name: Sequelize.STRING,
    Description: Sequelize.STRING,
    TaskStartDate: Sequelize.DATE,
    TaskEndDate: Sequelize.DATE
  });

  taskList.hasMany(task,{
    onDelete: 'CASCADE',
    foreignKey: {
        allowNull : false
    }
});

task.belongsTo(taskList,{
  foreignKey: {
      allowNull : false
  }
});

  sequelize.sync();
  module.exports = task;
