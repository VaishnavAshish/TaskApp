var Sequelize = require('sequelize');
var sequelize = require('../connection/sequelizeCon');

var User = sequelize.define("users", {
  FirstName: Sequelize.STRING,
  LastName: Sequelize.STRING,
  CompanyName: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
}, {});
 
sequelize.sync();
module.exports = User; 