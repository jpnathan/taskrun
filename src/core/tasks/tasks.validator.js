'use strict';

const Joi = require('joi');

module.exports.createTaskSchema = Joi.object({
	summary: Joi.string().max(2500).required(),
	performed: Joi.boolean().default(false).allow(null)
});
