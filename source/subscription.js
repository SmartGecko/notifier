var amqp = require('./amqp');
var postal = require('postal');
var config = require('../config');
var bus = postal.channel('event:receive');
var serializer = require('sg-event-bus').serializer;
var logger = require('./utils/logger');

var connection;

var subscription = {
    listen: function (callback) {
        connection = amqp(config);

        connection.on('ready', function() {
            logger.info('amqp connected');
            var exchangeOptions = {
                passive: true,
                durable: true,
                autoDelete: false
            };

            try {
                var queue = connection.queue(config.amqp.queue, exchangeOptions, function () {
                    queue.bind(config.amqp.exchange, '#');

                    logger.info('subscribed to ' + config.amqp.queue + ' with routing key #');

                    queue.subscribe(function (message, headers, deliveryInfo, messageObject) {
                        serializer.deserialize(message.data, function (err, data) {
                            logger.info('received message' + deliveryInfo.routingKey);
                            bus.publish(deliveryInfo.routingKey, {event: data});
                        })
                    });
                });

                callback();
            } catch (e) {
                console.log(e);
                logger.error(e);
            }
        });
    },

    close: function (callback) {
        if (!connection) {
            throw new Error('amqp not started, forgot to call .listen()?');
        }

        amqp.disconnect(function (err) {
            logger.info('amqp shutdown');
            callback && callback(err);
        });
    }
};

module.exports = {
    _subscription: subscription
};