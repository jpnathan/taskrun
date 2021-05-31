'use strict';

const tasksService = require('./tasks.service');
const { Router } = require('express');
const { autorize } = require('../middlewares/autorize');
const route = Router();

route.get('/tasks', autorize('manager'), (req, res) => {
	tasksService.getAll(req, (err, data) => {
		if (err) return res.status(400).json(err);
		res.status(200).json(data);
	});
});

route.post('/tasks', autorize(['manager', 'technician']), (req, res) => {
	tasksService.create(req, (err, data) => {
		if (err) return res.status(400).json(err);
		res.status(200).json(data);
	});
});

route.delete('/tasks/:id', autorize('manager'), (req, res) => {
	tasksService.delete(req.params, (err, data) => {
		if (err) return res.status(400).json(err);
		res.status(200).json(data);
	});
});

route.post(
	'/tasks/perform/:id',
	autorize(['manager', 'technician']),
	(req, res) => {
		tasksService.perform(req, (err, data) => {
			if (err) return res.status(400).json(err);
			res.status(200).json(data);
		});
	}
);

module.exports = route;
