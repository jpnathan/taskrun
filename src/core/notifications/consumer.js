'use strict';

module.exports.consumeMessageFromQueue = (queueInfo) => {
	const { channel, queue } = queueInfo;
	channel.consume(queue, (message) => handleMessage(message), { noAck: true });
	return queueInfo;
};

function handleMessage(buffer) {
	const { content } = buffer;
	const contentAsString = content.toString('utf-8');
	console.log(contentAsString);
}
