const path = require('path');
const _ = require('lodash');
const fs = require('fs');

module.exports = {
	eslint: {
		enable: false,
	},
	webpack: {
		alias: {
			react: 'preact/compat',
			'react-dom': 'preact/compat',
			'react-dom/test-utils': 'preact/test-utils',
		},
		configure: (webpackConfig, { env, paths }) => {
			// Alias @
			_.set(webpackConfig, ['resolve', 'alias', '@'], path.resolve(__dirname, `${paths.appSrc}/`));

			return webpackConfig;
		},
	},
	devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
		devServerConfig.https = {
			key: fs.readFileSync('./node_modules/localhost-certs/files/server.key', 'utf8'),
			cert: fs.readFileSync('./node_modules/localhost-certs/files/server.crt', 'utf8'),
		};
		return devServerConfig;
	},
};
