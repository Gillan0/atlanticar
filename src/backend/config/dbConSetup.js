const mysql = require('mysql');

/**
 * Establishes a connection to the MySQL database using environment variables.
 * @constant
 * @type {Object}
 */
const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});


/**
 * Connects to the MySQL database and logs the connection status.
 * @function
 * @param {Error} err - The error object if the connection fails.
 */
connection.connect((err) => {
    err ? console.error('Error connecting to the database:', err) : console.log('Connected to the MySQL database');
});


/**
 * Executes a SQL query and returns the results as a Promise.
 * @function
 * @param {string} sql - The SQL query string.
 * @param {Array} params - The parameters for the SQL query.
 * @returns {Promise} A promise that resolves with the query results or rejects with an error.
 */
const queryAsPromise = (sql, params) => {
    console.log(sql, params);
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            err ? reject(err) : resolve(results);
        });
    });
};


/**
 * Exports the MySQL connection and queryAsPromise function.
 * @exports connection
 * @exports queryAsPromise
 */
exports.connection = connection;
exports.queryAsPromise = queryAsPromise;
