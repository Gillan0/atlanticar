// Données à envoyer
const dataToSend = {
  username: 'user1',
  password: 'pwd1234'
};

// Options de la requête
const requestOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dataToSend) // Convertir les données en format JSON
};

// URL de l'endpoint où envoyer les données
const url = 'http://192.168.1.29:3000';

// Envoi de la requête avec fetch
fetch(url, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur lors de la requête.');
    }
    return response.json(); // Renvoie les données JSON de la réponse
  })
  .then(data => {
    console.log('Réponse du serveur :', data);
  })
  .catch(error => {
    console.error('Erreur :', error);
  });
