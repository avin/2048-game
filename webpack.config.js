/* eslint-disable */

/**
 * >>> ⚠⚠⚠ Use craco.config.js to configure webpack ⚠⚠⚠ <<<
 */

const { createWebpackDevConfig } = require('@craco/craco');
const cracoConfig = require('./craco.config');

module.exports = () => {
	return createWebpackDevConfig(cracoConfig);
};
