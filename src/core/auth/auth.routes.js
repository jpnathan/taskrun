'use strict';

const loginService = require('./login.service');
const { Router } = require('express');
const route = Router();

route.post('/login', (req, res) => {
	console.log('\n\n', req.body);
	loginService.login(req.body, (err, data) => {
		if (err) return res.status(401).json(err);
		res.status(200).json(data);
	});
});

module.exports = route;
