'use strict';

const usersService = require('./users.service');
const { Router } = require('express');
const route = Router();

route.post('/users', (req, res) => {
	usersService.create(req.body, (err, data) => {
		if (err) return res.status(400).json(err);
		res.status(200).json(data);
	});
});

route.get('/users/:id', (req, res) => {
	usersService.getUser(req.params, (err, data) => {
		if (err) return res.status(404).json({ err });
		res.status(200).json(data);
	});
});

module.exports = route;
