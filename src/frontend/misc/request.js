import url from "./url";

export default function request(id,pwd,msg) {
    // Données à envoyer
  const dataToSend = {
    id: id,
    password: pwd,
    message : msg
  };
  
  // Options de la requête
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataToSend) // Convertir les données en format JSON
  };
  // Envoi de la requête avec fetch
  return (
  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erreur lors de la requête.');
      }
      return response.json(); // Renvoie les données JSON de la réponse
    })
    .then(data => {
      console.log('Réponse du serveur :', data.msg);
      return data.offers;
    })
    .catch(error => {
      console.error('Erreur :', error);
    })  
    )
}