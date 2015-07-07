var config = {
	connection: 'mongodb://localhost:27017/notifiertestdb',
	accessToken: '1234',

    amqp: {
        host: 'localhost',
        port: 5672,
        login: 'guest',
        password: 'guest',
        vhost: '/'
    },

	logentries: {
		token: null
	},

	hook: {
		url: 'http://localhost:5000/api/notify/',
		token: 'fake-hook-token'
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