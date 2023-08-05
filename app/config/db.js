const Sequelize = require('sequelize');
const sequelizeConnect = new Sequelize('PLACEHOLDER', 'root', 'root', {dialect: 'mysql', host: 'PLACEHOLDER'});
module.exports = {sequelizeConnect, Sequelize};