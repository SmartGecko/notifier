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
    })
    .execute('send-business-registration-email', function (action, transport, callback) {
        transport.ses.send('business-registration', action, {
            from: 'activation@smartgecko.eu',
            to: action.data.emailAddress,
            subject: 'Business registration'
        }, callback);
    });

notifier
    .receive('SmartGecko.Domain.Pos.Api.Event.ActivationRequestedEvent', function (event, actions, callback) {
        actions.create('send-device-activation-email', {event: event}, callback);
    })
    .resolve('send-device-activation-email', function (action, actions, callback) {
        var businessService = SmartGecko.Client.getBusinessService();
        var accountsService = SmartGecko.Client.getAccountsService();

        businessService.getEmployeeAccountIdentifier(action.event.payload.recipientIdentifier, function (err, accountId) {
            if (err)
                return callback(err);

            accountsService.getAccount(accountId, function (err, account) {
                if (err)
                    return callback(err);

                var data = {
                    activationCode: action.event.payload.activationCode,
                    emailAddress: account.email
                };

                actions.resolved(action, data, callback);
            });
        });
    })
    .execute('send-device-activation-email', function (action, transport, callback) {
        transport.ses.send('device-activation', action, {
            from: 'activation@smartgecko.eu',
            to: action.data.emailAddress,
            subject: 'Device Activation'
        }, callback);
    });


notifier.start(process.env.NODE_PORT || 3031);