var kv = kv || {};

if (typeof kv.phoneGap == 'undefined') {
	kv = {
		phoneGap: {}
	};
}

kv.phoneGap.localStorage = (function ($, kv, global, undefined) {

	'use strict';

	var private_key = '1234567890';

	function key(key) {
		return window.localStorage.key(key);
	}

	function setItem(key, value) {
		return window.localStorage.setItem(key, CryptoJS.AES.encrypt(value, private_key).toString());
	}
	function getItem(key) {
		var value = window.localStorage.getItem(key);

		if (value != undefined) {
			return hex2a(CryptoJS.AES.decrypt(window.localStorage.getItem(key), private_key).toString());
		}
	}

	function removeItem(key) {
		return window.localStorage.removeItem(key);
	}

	function clear(key) {
		return window.localStorage.clear();
	}

	// Taken from http://stackoverflow.com/questions/3745666/how-to-convert-from-hex-to-ascii-in-javascript
	function hex2a(hex) {
		var str = '';
		for (var i = 0; i < hex.length; i += 2) {
			str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
		}
		return str;
	}

	return {
		aes: {
			key: key
			, setItem: setItem
			, getItem: getItem
			, removeItem: removeItem
			, clear: clear
		}
	}

}(jQuery, kv, window));
