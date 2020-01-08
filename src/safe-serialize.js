module.exports = function safeSerialize(obj) {
	'use strict';
	try {
		return JSON.stringify(obj);
	} catch (_) {
		return '';
	}
};
