'use strict';

const { DataTypes } = require('sequelize');
const database = require('../../config/db/postgres');

const Task = database.define('tasks', {
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	summary: {
		type: DataTypes.STRING,
		allowNull: false
	},
	performed: {
		type: DataTypes.BOOLEAN,
		default: false
	},
	performed_date: {
		type: DataTypes.DATE
	},
	userId: {
		type: DataTypes.INTEGER,
		foreignKey: true
	}
});

Task.associate = (models) => {
	Task.belongsTo(models.User);
};

module.exports = Task;
