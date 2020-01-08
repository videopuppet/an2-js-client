module.exports = function SafeStorageAdapter(underlyingStorage) {
	'use strict';
	const self = this;
	self.getItem = (key) => {
		try {
			return underlyingStorage.getItem(key);
		} catch (_) {
			return false;
		}
	};
	self.setItem = (key, val) => {
		try {
			return underlyingStorage.setItem(key, val);
		} catch (_) {
			return false;
		}
	};
};
