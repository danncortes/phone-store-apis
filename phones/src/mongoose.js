const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://test:12345*@cluster0-ijtzg.mongodb.net/phone-app?retryWrites=true');

module.exports = { mongoose };