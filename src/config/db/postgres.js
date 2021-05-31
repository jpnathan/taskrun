'use strict';

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.POSTGRES_URL, {
	dialect: 'postgres'
});

module.exports = sequelize;
