'use strict';

const { publishMessageToQueue } = require('../notifications/publisher');
const Task = require('./tasks.model');
const { createTaskSchema } = require('./tasks.validator');

const getAll = async (req, callback) => {
	try {
		const tasks = await Task.findAll();
		callback(null, { status: true, result: tasks });
	} catch (error) {
		callback(error, null);
	}
};

const create = async (req, callback) => {
	const { user, body } = req;
	console.log(body);
	try {
		const value = await createTaskSchema.validateAsync(body);
		const task = await Task.create({
			...value,
			userId: user.id
		});
		callback(null, { status: true, result: task });
	} catch (error) {
		callback(error, null);
	}
};

const deleteTask = async (params, callback) => {
	const { id } = params;

	try {
		if (id) {
			await Task.destroy({ where: { id } });
			callback(null, {
				status: true,
				result: {}
			});
		}
	} catch (error) {
		callback(error, null);
	}
};

const perform = async (req, callback) => {
	const { user } = req;
	const { id } = req.params;

	try {
		const task = await Task.findOne({ where: { id } });

		if (task.performed) {
			return callback(
				{
					status: false,
					message: `Task already performed at ${task.performed_date}`
				},
				null
			);
		}
		const payload = {
			performed: true,
			performed_date: new Date()
		};
		await Task.update(payload, { where: { id, userId: user.id } });

		publishMessageToQueue(
			queueData,
			`\n Manager Notification: The tech ${user.name} performed the task ${id} on date ${payload.performed_date}
			\n`
		);

		callback(null, {
			status: true,
			result: {
				...payload,
				taskId: id
			}
		});
	} catch (error) {
		callback(error, null);
	}
};

module.exports = {
	getAll,
	create,
	delete: deleteTask,
	perform
};
