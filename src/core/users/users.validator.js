'use strict';

const Joi = require('joi');

const createSchema = Joi.object({
	name: Joi.string().required(),
	password: Joi.string().required(),
	email: Joi.string().email({
		minDomainSegments: 2,
		tlds: { allow: ['com', 'net', 'pt'] }
	}),
	role: Joi.string().required()
});

module.exports = createSchema;
