const SafeStorageAdapter = require('../src/safe-storage-adapter');
describe('SafeStorageAdapter', () => {
	'use strict';
	let underTest, underlyingStorage;
	beforeEach(() => {
		underlyingStorage = {
			getItem: jest.fn(),
			setItem: jest.fn()
		};
		underTest = new SafeStorageAdapter(underlyingStorage);
	});
	describe('getItem', () => {
		test('passes through if no exception', () => {
			underlyingStorage.getItem.mockReturnValue('XXY');
			expect(underTest.getItem('key1')).toEqual('XXY');
			expect(underlyingStorage.getItem).toHaveBeenCalledWith('key1');
		});
		test('catches exceptions and returns false', () => {
			underlyingStorage.getItem.mockImplementation(() => {
				throw new Error('x');
			});
			expect(underTest.getItem('key1')).toBeFalsy();
			expect(underlyingStorage.getItem).toHaveBeenCalledWith('key1');
		});
	});
	describe('setItem', () => {
		test('passes through if no exception', () => {
			underlyingStorage.setItem.mockReturnValue('result');
			expect(underTest.setItem('key1', 'val1')).toEqual('result');
			expect(underlyingStorage.setItem).toHaveBeenCalledWith('key1', 'val1');
		});
		test('catches exceptions and returns false', () => {
			underlyingStorage.setItem.mockImplementation(() => {
				throw new Error('x');
			});
			expect(underTest.setItem('key1', 'val1')).toBeFalsy();
			expect(underlyingStorage.setItem).toHaveBeenCalledWith('key1', 'val1');
		});
	});
});

