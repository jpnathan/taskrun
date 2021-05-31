'use strict';

module.exports.publishMessageToQueue = async (queueInfo, message) => {
	const { channel, queue } = queueInfo;
	await channel.sendToQueue(queue, Buffer.from(message));
	return queueInfo;
};
