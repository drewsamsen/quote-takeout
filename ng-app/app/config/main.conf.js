'use strict';

/**
 * Environments based configuration
 *
 * All patterns "___var_name" will be replaced with values from
 * config/env/{dev|production|...}.json
 *
 * Gulp task: config.js
 * Usage: gulp build --env=production
 */

angular.module('quoteTakeout')

  .constant('ENV', '___env_name')
  .constant('API_URL', '___api_url')

;
