'use strict';

const amqp = require('amqplib');

const connectionString = {
	protocol: 'amqp',
	hostname: 'localhost',
	username: 'guest',
	password: 'guest'
};

module.exports.connect = () => {
	return amqp.connect(connectionString);
};

module.exports.createChannel = async (connection) => {
	const channel = await connection.createChannel();
	return { channel, connection };
};

module.exports.createQueue = async (queueInfo, queue) => {
	const { channel } = queueInfo;

	await channel.assertQueue(queue, { durable: false });
	return { ...queueInfo, queue };
};

module.exports.closeConnection = (connection) => {
	return connection.close();
};
