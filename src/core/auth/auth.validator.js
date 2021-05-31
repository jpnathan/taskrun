'use strict';

const Joi = require('joi');

const loginSchema = Joi.object({
	password: Joi.string().required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net', 'pt'] }
	})
});

module.exports.loginSchema = loginSchema;
