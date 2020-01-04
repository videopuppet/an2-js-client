const Recorder = require('../src/recorder');
describe('Recorder', () => {
	'use strict';
	let storage, sender, config, timer, underTest, currentDay, currentMonth;
	beforeEach(() => {
		const properties = {};
		storage = {
			setItem: jest.fn((key, val) => properties[key] = val),
			getItem: jest.fn((key) => properties[key]),
			properties
		};
		sender = {
			send: jest.fn()
		};
		config = {
			propertyPrefix: 'an2'
		};
		timer = {
			getMonth: jest.fn(() => currentMonth),
			getDate: jest.fn(() => currentDay)
		};
		underTest = new Recorder({storage, sender, config, timer});
	});
	describe('event', () => {
		test('captures event name as event', () => {
			underTest.event('pageLoad');
			expect(sender.send.mock.calls.length).toBe(1);
			expect(sender.send.mock.calls[0][0].event).toEqual('pageLoad');
		});
		test('merges the event properties into the object', () => {
			underTest.event('pageLoad', {registered: 'yes', 'url': '/home'});
			expect(sender.send.mock.calls.length).toBe(1);
			expect(sender.send.mock.calls[0][0].registered).toEqual('yes');
			expect(sender.send.mock.calls[0][0].url).toEqual('/home');
		});
		test('lets the event properties override name',	() => {
			underTest.event('pageLoad', {'event': 'somethingElse', 'url': '/home'});
			expect(sender.send.mock.calls[0][0].event).toEqual('somethingElse');
		});
		describe('when nothing is in storage', () => {
			beforeEach(() => {
				currentMonth = '2020-01';
				currentDay = '2020-01-01';
			});
			test('sends flags for both month and date', () => {
				underTest.event('pageLoad');
				expect(sender.send.mock.calls[0][0].uniqueMonth).toEqual(1);
				expect(sender.send.mock.calls[0][0].uniqueDate).toEqual(1);
			});
			test('updates both month and date in storage', () => {
				underTest.event('pageLoad');
				expect(storage.setItem.mock.calls.length).toBe(2);
				expect(storage.setItem).toBeCalledWith('an2-month', '2020-01');
				expect(storage.setItem).toBeCalledWith('an2-date', '2020-01-01');
			});
		});
		describe('when both month and date are in storage but to not match', () => {
			beforeEach(() => {
				currentMonth = '2020-01';
				currentDay = '2020-01-01';
				storage.properties['an2-month'] = '2019-12';
				storage.properties['an2-date'] = '2019-12-29';
			});
			test('sends flags for both month and date', () => {
				underTest.event('pageLoad');
				expect(sender.send.mock.calls[0][0].uniqueMonth).toEqual(1);
				expect(sender.send.mock.calls[0][0].uniqueDate).toEqual(1);
			});
			test('updates both month and date in storage', () => {
				underTest.event('pageLoad');
				expect(storage.setItem.mock.calls.length).toBe(2);
				expect(storage.setItem).toBeCalledWith('an2-month', '2020-01');
				expect(storage.setItem).toBeCalledWith('an2-date', '2020-01-01');
			});
		});
		describe('when stored month matches but date does not', () => {
			beforeEach(() => {
				currentMonth = '2020-01';
				currentDay = '2020-01-02';
				storage.properties['an2-month'] = '2020-01';
				storage.properties['an2-date'] = '2020-01-01';
			});
			test('sends only flag for date', () => {
				underTest.event('pageLoad');
				expect(sender.send.mock.calls[0][0].uniqueMonth).toBeUndefined();
				expect(sender.send.mock.calls[0][0].uniqueDate).toEqual(1);
			});
			test('updates only date in storage', () => {
				underTest.event('pageLoad');
				expect(storage.setItem.mock.calls.length).toBe(1);
				expect(storage.setItem).toBeCalledWith('an2-date', '2020-01-02');
			});
		});
		describe('when both stored date and month match', () => {
			beforeEach(() => {
				currentMonth = '2020-01';
				currentDay = '2020-01-02';
				storage.properties['an2-month'] = '2020-01';
				storage.properties['an2-date'] = '2020-01-02';
			});
			test('does not send any unique flags', () => {
				underTest.event('pageLoad');
				expect(sender.send.mock.calls[0][0].uniqueMonth).toBeUndefined();
				expect(sender.send.mock.calls[0][0].uniqueMonth).toBeUndefined();
			});
			test('does not update storage', () => {
				underTest.event('pageLoad');
				expect(storage.setItem.mock.calls.length).toBe(0);
			});

		});
	});
});


