const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.set('useFindAndModify', false);

// dotenv
require('dotenv').config();

//mongoDB Atlas Connection
mongoose
	.connect(process.env.DATABASEURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true
	})
	.then(() => {
		console.log('Connection successful!');
	})
	.catch((err) => {
		console.log('ERROR: ', err.message);
	});

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');
