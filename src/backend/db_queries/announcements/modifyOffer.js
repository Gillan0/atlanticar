/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * modifie une offre créée par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function modifyOffer(data) {
    // Initialize variables
    var [queries, parameters] = [[],[]];
    const param1 = data.parameters[0];
    const candidates = data.parameters[1];
    const passengers = data.parameters[2];
    const author = data.parameters[3];
    
    // Handle the update of the offer
    queries.push(`
        UPDATE 
            offer 
        SET 
            departure = ?,
            arrival = ?,
            date = ?,
            price =  ?,
            nb_seat = ?, 
            comment = ?
        WHERE id = ? AND author = ? and ? = (SELECT a.password FROM account AS a WHERE a.id = ?);
    `);
    parameters.push(param1);

    // Sends notification to each candidate that the offer was changed
    if (candidates) {
        candidates.map((value) => {
            if (value) { 
                let id_candidate = parseInt(value.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié son offre'), false, NOW());`)
                parameters.push([id_candidate, author])
            }   
        })
    }
    // Sends notification to each passenger that the offer was changed
    if (passengers) {
        passengers.map((value) => {
            if (value) { 
                let id_passenger = parseInt(value.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a modifié son offre'), false, NOW());`)
                parameters.push([id_passenger, author])
            }   
        })
    }

    return [queries, parameters]  
}

exports.modifyOffer = modifyOffer