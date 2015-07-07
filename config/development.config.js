var config = {
	connection: 'mongodb://localhost:27017/notifier',
	accessToken: '1234',

    amqp: {
        host: 'localhost',
        port: 5672,
        login: 'guest',
        password: 'guest',
        vhost: '/',
        exchange: 'Notifier.Exchange.Sync',
        queue: 'Notifier.Queue.Sync'
    },
	hook: {
		url: 'http://localhost:5000/api/notify/',
		token: 'fake-hook-token'
	},

	logentries: {
		token: null
	},

	transport: {
        ses: {
            accessKeyId: 'fake-ses-access-key',
            secretAccessKey: 'fake-ses-secret-key',
            region: 'fake-region'
        },
		gcm : {
			serverApiKey: 'fake-google-server-api-key'
		},
		apn : {
			cert: 'fake-cert-path',
			key: 'fake-key-path'
		}
	},

	jobs: {
		run: {
			resolve: 5,
			execute: 10
		},

		collection: 'notifierJobs'
	},

    services: {
        'AccountsService': {
            host: 'localhost',
            port: 9090,
            path: '/accounts'
        }
    }
};

module.exports = config;