/* eslint-disable */

/**
 * >>> ⚠⚠⚠ ВНИМАНИЕ ⚠⚠⚠ <<<
 *
 * Данный файл отдает текущую конфиугурацию Webpack. Используется только для нужд IDE и react-cosmos.
 * Конфигурацию в этом файле не проводить!!! Для конфигурирования использовать craco.config.js
 */

const { createWebpackDevConfig } = require('@craco/craco');
const cracoConfig = require('./craco.config');

module.exports = () => {
  return createWebpackDevConfig(cracoConfig);
};
