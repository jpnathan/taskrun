'use strict';

const axios = require('axios');

describe('Test Login', () => {
	test('should do login', async (done) => {
		const payload = {
			email: 'test@email.com',
			password: 'superpass'
		};
		const login = await axios.post('http://localhost:3000/login', payload);
		expect(login.data.status).toEqual(true);
		expect(typeof login.data.result).toBe('string');
		done();
	});
});
