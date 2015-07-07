var notifier = require('./source/notifier');
var SmartGecko = require('./SmartGecko');

notifier
	.receive('SmartGecko.Domain.Business.Api.Event.BusinessRegisteredEvent', function (event, actions, callback) {
        console.log(event);
		actions.create('send-business-registration-email', {event: event}, callback);
	})
	.resolve('send-business-registration-email', function (action, actions, callback) {
        var accountsService = SmartGecko.Client.getAccountsService();

        accountsService.getAccount(action.event.payload.ownerIdentifier, function (err, account) {
            if (err)
                return callback(err);

            var data = {
                businessName: action.event.payload.name,
                emailAddress: account.email
            };

            actions.resolved(action, data, callback);
        });
	}).
	execute('send-business-registration-email', function (action, transport, callback) {
        transport.ses.send('business-registration', action, {
            from: 'activation@smartgecko.eu',
            to: action.data.emailAddress,
            subject: 'Business registration'
        }, callback);
	});


notifier.start(process.env.NODE_PORT || 3031);