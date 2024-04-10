// Ps1d4f9x28Clq5TbN6X810z
// Lisez le fichier SQL
const mysql = require('mysql');

// Configuration de la connexion à la base de données MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306, // Port de la base de données MySQL
  user: 'root',
  password: 'Ps1d4f9x28Clq5TbN6X810z',
  database: 'atlanticar'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données : ' + err.stack);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});
// Fermeture de la connexion à la base de données
connection.end();
