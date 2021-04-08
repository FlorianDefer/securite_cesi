// This file will handle connection logic to the MongoDB database
console.log("file mongoose")
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
console.log("try to connect")
mongoose.connect('mongodb://localhost:27017/TaskManager', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
    console.log(e);
});

// To prevent deprecation warnings (from MongoDB native driver)
// mongoose.set('useCreateIndex', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useUnifiedTopology', true);


module.exports = {
    mongoose
};