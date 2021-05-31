'use strict';

const { Router } = require('express');
const jwt = require('jsonwebtoken');

const route = Router();

route.use((req, res, next) =>
	jwt.verify(
		req.headers['authorization'],
		process.env.JWT_SECRET,
		(err, userDecoded) => {
			if (err) {
				return res.json({ status: 'error', message: err.message });
			}

			req.user = userDecoded;
			next();
		}
	)
);

module.exports = route;
