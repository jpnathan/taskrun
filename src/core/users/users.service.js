'use strict';

const User = require('./users.model');
const bcrypt = require('bcrypt');
const createSchema = require('./users.validator');

module.exports.create = async (body, callback) => {
	try {
		const value = await createSchema.validateAsync(body);
		value.password = bcrypt.hashSync(value.password, bcrypt.genSaltSync(8));
		const user = await User.create(value);
		callback(null, { status: true, result: user });
	} catch (error) {
		callback(error, null);
	}
};

module.exports.getUser = async (params, callback) => {
	const { id, email } = params;
	try {
		const user = await User.findOne({
			where: {
				...(id && { id }),
				...(email && { email })
			}
		});
		return callback(null, user);
	} catch (error) {
		return callback(error, null);
	}
};
