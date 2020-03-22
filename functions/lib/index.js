const fs = require('fs');
const path = require('path');
const basename = path.basename;
const server = require('./server');

exports = module.exports = (options = {}) => {
	server.init(options);
	server.onRequest = server.onRequest.bind(server);
	return server;
};

fs.readdirSync(__dirname + '/plugins').forEach((filename) => {
	if (!/\.js$/.test(filename)) return;

	var name = basename(filename, '.js');

	function load() {
		return require('./plugins/' + name);
	};

	Object.defineProperty(exports, name, {
		value: load
	});
});
