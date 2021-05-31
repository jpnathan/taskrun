require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { tasks, users, auth } = require('./core/routes');
const database = require('./config/db/postgres');
const authMiddlerware = require('./core/middlewares/auth');
const rabbitMQ = require('./config/rabbitMQ/connection');
const consumer = require('./core/notifications/consumer');

const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(auth(), authMiddlerware, tasks(), users());

if (require.main === module) {
	app.listen(process.env.PORT, async () => {
		const databaseConnection = await database.sync();
		const connection = await rabbitMQ.connect();
		const channel = await rabbitMQ.createChannel(connection);
		const queueData = await rabbitMQ.createQueue(channel, 'notifyManager');
		global.queueData = queueData;
		consumer.consumeMessageFromQueue(queueData);

		if (databaseConnection) {
			console.log('Database is connected');
		}

		return console.log(`Server is listening on ${process.env.PORT}`);
	});
}

module.exports = app;
