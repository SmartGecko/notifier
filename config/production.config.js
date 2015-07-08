function mongoUrl(database) {

    function authString() {
        return (process.env.MONGO_LOGIN && process.env.MONGO_PASSWORD) ?
        process.env.MONGO_LOGIN + ':' + process.env.MONGO_PASSWORD + '@' : '';
    }

    return 'mongodb://' + authString() + (process.env.MONGO_PORT_27017_TCP_ADDR || 'localhost') + ':' +
        (process.env.MONGO_PORT_27017_TCP_PORT || '27017') + '/' + database;
}

var config = {
	connection: mongoUrl('notifier'),
	accessToken: process.env.ACCESS_TOKEN,

    amqp: {
        host: process.env.AMQP_PORT_5672_TCP_ADDR,
        port: process.env.AMQP_PORT_5672_TCP_PORT,
        login: process.env.AMQP_LOGIN,
        password: process.env.AMQP_PASSWORD,
        vhost: '/',
        exchange: 'Notifier.Exchange.Sync',
        queue: 'Notifier.Queue.Sync'
    },

	logentries: {
		token: process.env.LOGENTRIES_TOKEN
	},

	hook: {
		url: process.env.HOOK_URL,
		token: process.env.HOOK_TOKEN
	},

	transport: {
        ses: {
            accessKeyId: process.env.AMAZON_ACCESS_ID,
            secretAccessKey: process.env.AMAZON_ACCESS_SECRET,
            region: process.env.AMAZON_REGION
        },
		gcm : {
			serverApiKey: process.env.GOOGLE_SERVER_API_KEY
		},
		apn : {
			cert: process.env.APPLE_CERT,
			key: process.env.APPLE_KEY
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
            host: process.env.ACCOUNTS_PORT_9090_TCP_ADDR,
            port: process.env.ACCOUNTS_PORT_9090_TCP_PORT,
            path: '/accounts'
        },
        'BusinessService': {
            host: process.env.BUSINESS_PORT_9090_TCP_ADDR,
            port: process.env.BUSINESS_PORT_9090_TCP_PORT,
            path: '/business'
        }
    }
};

module.exports = config;