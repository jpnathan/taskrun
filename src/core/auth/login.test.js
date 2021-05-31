'use strict';

const supertest = require('supertest');
const app = require('../../server');

describe('Test Login', () => {
	test('should do login', (done) => {
		const payload = {
			email: 'phillipjonathan@gmail.com',
			password: 'superpass'
		};
		supertest(app)
			.post('/login')
			.send(payload)
			.expect(200)
			.end(function (err, res) {
				expect(res.body.status).toEqual(true);
				expect(typeof res.body.result).toBe('string');
				done();
			});
	});
});
