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
            accessKeyId: 'AKIAIKSWDSGA63EAXFZQ',
            secretAccessKey: 'fNneXz/YFLFohOT6Yw4RhG0GEe2URaxIvsRIJ77l',
            region: 'eu-west-1'
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
        },
        'BusinessService': {
            host: 'localhost',
            port: 7777,
            path: '/business'
        }
    }
};

module.exports = config;