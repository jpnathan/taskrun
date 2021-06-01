'use strict';

const axios = require('axios');
let axiosInstance;
global.totalTasks = 1;

describe('Test Tasks', () => {
	beforeAll(async () => {
		const payload = {
			email: 'test@email.com',
			password: 'superpass'
		};
		const { error, data } = await axios.post(
			'http://localhost:3000/login',
			payload
		);

		const token = data.result;
		axiosInstance = axios.create({
			baseURL: 'http://localhost:3000',
			headers: { Authorization: token }
		});
	});

	test('should create task', async (done) => {
		const payload = {
			summary: 'Create new task test.'
		};
		const { error, data } = await axiosInstance.post('/tasks', payload);
		expect(data.status).toEqual(true);
		expect(typeof data.result).toBe('object');
		expect(data.result.summary).toBe(payload.summary);
		expect(data.result.performed).toBe(false);
		global.taskId = data.result.id;
		done();
	});

	test('should perform a task', async (done) => {
		const { error, data } = await axiosInstance.post(
			'/tasks/perform/' + global.taskId
		);
		console.log(global.taskId);
		expect(data.status).toEqual(true);
		expect(typeof data.result).toBe('object');
		expect(data.result.performed).toBe(true);
		done();
	});

	test('should return all tasks', async (done) => {
		const { error, data } = await axiosInstance.get('/tasks');
		expect(data.status).toEqual(true);
		expect(Array.isArray(data.result)).toBe(true);
		expect(data.result.length).toBe(global.totalTasks);
		done();
	});

	test('should delete a task', async (done) => {
		const { error, data } = await axiosInstance.delete(
			'/tasks/' + global.taskId
		);
		expect(data.status).toEqual(true);
		expect(typeof data.result).toBe('object');
		global.totalTasks = global.taskId - 1;
		done();
	});
});
