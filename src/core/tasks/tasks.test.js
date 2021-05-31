'use strict';

const supertest = require('supertest');
const app = require('../../server');

describe('Test Tasks', () => {
	test('should create task', (done) => {
		const payload = {
			summary: 'test'
		};
		supertest(app)
			.post('/tasks')
			.send(payload)
			.expect(200)
			.end(function (err, res) {
				console.log(res.body);
				expect(res.body.status).toEqual(true);
				expect(typeof res.body.result).toBe('object');
				done();
			});
	});
});
