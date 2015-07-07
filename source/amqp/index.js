var amqp = require('amqp');

module.exports = function (config, connection) {
    connection = connection || 'amqp';
    var conn = amqp.createConnection(config[connection]);

    if (!conn) {
        throw new Error('could not connect to ' + config.connection);
    }

    return conn;
};