require('dotenv').config();

const mysql = require('mysql');

const connection = mysql.createConnection({

	host	 : process.env.DB_HOST,
	port	 : process.env.DB_PORT,
	user	 : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME

});


connection.connect(err => {

	if (err) {

		console.error('Data base connection error: ', err);
		return;

	}

	console.log('MySql Database connection successfully');

});

module.exports = connection;
