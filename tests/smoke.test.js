describe('NPM loading smoke tests', () => {
	'use strict';
	test('index', () => {
		expect(typeof require('../src/index')).toEqual('function');
	});
});
