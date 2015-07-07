/**
 * This file is part of the SmartGecko(c) business platform.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var config = require('./config/index');
var logger = require('./source/utils/logger');
var SmartGecko = require('sg-domain-sdk-js');

// load service configuration
var client = new SmartGecko.Client(config.services);

client.listServices(function (err, list) {
    list.forEach(function (service) {
        logger.info('loaded service ' + service);
    });
});

module.exports.Client = client;
module.exports.SmartGecko = SmartGecko;