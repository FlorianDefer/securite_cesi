
const DB_URI = 'mongodb://localhost:27017/TaskManager';

const config = require('config.json');
console.log("file mongoose")
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
console.log("try to connect")

if (process.env.NODE_ENV === 'test') {
    console.log('Connecting to a mock db for testing purposes.');
    const {MongoMemoryServer} = require('mongodb-memory-server');

    const mongoServer = new MongoMemoryServer();

    mongoose.Promise = Promise;
    mongoServer.getUri()
        .then((mongoUri) => {
            const mongooseOpts = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            };

            mongoose.connect(mongoUri, mongooseOpts);

            mongoose.connection.on('error', (e) => {
                if (e.message.code === 'ETIMEDOUT') {
                    console.log(e);
                    mongoose.connect(mongoUri, mongooseOpts);
                }
                console.log(e);
            });

            mongoose.connection.once('open', () => {
                console.log(`MongoDB successfully connected to ${mongoUri}`);
            });
        });
} else {
mongoose.connect("mongodb://localhost:27017/test", connectionOptions).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});
}
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    isValidId,
    connect,
    close
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}

function connect() {
    if (process.env.NODE_ENV === 'test') {
        console.log('Connecting to a mock db for testing purposes.');
        const {MongoMemoryServer} = require('mongodb-memory-server');

        const mongoServer = new MongoMemoryServer();

        mongoose.Promise = Promise;
        mongoServer.getUri()
            .then((mongoUri) => {
                const mongooseOpts = {
                    useNewUrlParser: true,
                    useCreateIndex: true,
                    useUnifiedTopology: true
                };

                mongoose.connect(mongoUri, mongooseOpts);

                mongoose.connection.on('error', (e) => {
                    if (e.message.code === 'ETIMEDOUT') {
                        console.log(e);
                        mongoose.connect(mongoUri, mongooseOpts);
                    }
                    console.log(e);
                });

                mongoose.connection.once('open', () => {
                    console.log(`MongoDB successfully connected to ${mongoUri}`);
                });
            });
    } else {
        mongoose.connect('YOUR REAL URI', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('Now connected to MongoDB!'))
            .catch(err => console.error('Something went wrong when connecting to the db', err));
    }
}
  
  function close() {
    return mongoose.disconnect();
}