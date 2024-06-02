const mysql = require('mysql');


const connection = mysql.createConnection({
    host	 : process.env.DB_HOST,
	port	 : process.env.DB_PORT,
	user	 : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME
})

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
})

const queryAsPromise = (sql, params) => {
    console.log(sql, params)
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    });
};

exports.connection = connection;
exports.queryAsPromise = queryAsPromise;