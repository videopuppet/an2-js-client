const safeSerialize = require('../src/safe-serialize');
describe('safeSerialize', () => {
	'use strict';
	test('returns a JSON serialized string if no exception', () => {
		expect(safeSerialize({a: 1})).toEqual('{"a":1}');
	});
	test('returns an empty string if the object cannot be serialized', () => {
		const obj = Object({});
		obj.toJSON = () => {
			throw new Error('boom!');
		};
		expect(safeSerialize(obj)).toEqual('');
	});
});
