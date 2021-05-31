'use strict';

const usersService = require('../users/users.service');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { loginSchema } = require('./auth.validator');

module.exports.login = async (body, callback) => {
	const { email } = body;
	try {
		await loginSchema.validateAsync(body);
		const user = await usersService.getUser({ email }, (error, data) => data);

		if (!user) {
			return callback(new Error('Unauthorized'), null);
		}

		const jwt = await generateToken(user, body);
		callback(null, { status: true, result: jwt });
	} catch (error) {
		callback(error, null);
	}
};

async function generateToken(user, body) {
	return new Promise(async (resolve, reject) => {
		const match = bcrypt.compareSync(body.password, user.password);

		if (match) {
			const { id, email, role, name } = user;
			const token = jwt.sign({ id, email, role, name }, process.env.JWT_SECRET);
			return resolve(token);
		}

		return reject({
			status: false,
			message: 'Unauthorized.'
		});
	});
}
