'use strict';

const tasks = require('./tasks/tasks.routes');
const users = require('./users/users.routes');
const auth = require('./auth/auth.routes');

module.exports = {
	tasks: () => {
		return tasks;
	},
	users: () => {
		return users;
	},
	auth: () => {
		return auth;
	}
};
