const config = require('config.json');
console.log("file mongoose")
const mongoose = require('mongoose');
const connectionOptions = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
console.log("try to connect")
//mongoose.connect(process.env.MONGODB_URI || config.connectionString, connectionOptions).then(() => {
//    console.log("Connected to MongoDB successfully :)");
//}).catch((e) => {
//    console.log("Error while attempting to connect to MongoDB");
//    console.log(e);
//});
mongoose.Promise = global.Promise;

module.exports = {
    Account: require('accounts/account.model'),
    RefreshToken: require('accounts/refresh-token.model'),
    isValidId
};

function isValidId(id) {
    return mongoose.Types.ObjectId.isValid(id);
}