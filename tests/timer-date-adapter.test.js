const TimerDateAdapter = require('../src/timer-date-adapter');
describe('TimerDateAdapter', () => {
	'use strict';
	let underTest, DateConstructor;
	beforeEach(() => {
		DateConstructor = jest.fn(() => new Date(1479427200000));
		underTest = new TimerDateAdapter(DateConstructor);
	});
	describe('getMonth', () => {
		it('returns the ISO month prefix', () => {
			expect(underTest.getMonth()).toEqual('2016-11');
		});
	});
	describe('getDate', () => {
		it('returns the ISO date prefix', () => {
			expect(underTest.getDate()).toEqual('2016-11-18');
		});
	});
});
