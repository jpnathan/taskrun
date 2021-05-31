'use strict';

const { DataTypes } = require('sequelize');
const database = require('../../config/db/postgres');

const User = database.define('users', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	role: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

User.associate = (models) => {
	User.hasMany(models.Task);
};

module.exports = User;
