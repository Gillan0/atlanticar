/**
 * Fonction qui renvoie les commandes SQL et les parametres adéquats pour 
 * supprimer une offre créée par un compte particulier
 * @param {*} data - Données envoyées par l'application
 * @returns [listQueries, listParams] -  
 *      - listQueries est une liste de String qui sont les commandes SQL à exécuter par la base de données
 *      - listParams est une liste de liste où chaque sous liste d'indice i est l'ensemble des paramètres nécessaire
 *        à la bonne exécution de la commande SQL d'indice i de listQueries
 */
function deleteOffer(data) {
    // Initializing variables
    var [queries, parameters] = [[],[]];
    const [id_author, author, id_offer, candidates, passengers] = data.parameters;

    // Removes all applications and sends a notification to each candidate
    if (candidates) {
        candidates.map((value) => {
            if (value) { 
                let id_candidate = parseInt(value.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé son offre'), false, NOW());`)
                parameters.push([id_candidate, author])
                queries.push(`DELETE FROM apply_offer WHERE candidate = ? AND id_offer = ? and author = ?`)
                parameters.push([id_candidate, id_offer, id_author])
            }   
        })
    }
    
    // Removes all passengers and sends them a notification each
    if (passengers) {
        passengers.map((value) => {
            if (value) { 
                let id_passenger = parseInt(value.split(':')[0]);
                queries.push(`INSERT INTO notification VALUES (DEFAULT, ?, CONCAT( ? , ' a annulé son offre'), false, NOW());`)
                parameters.push([id_passenger, author])
                queries.push(`DELETE FROM offer_client WHERE client = ? AND id_offer = ?`)
                parameters.push([id_passenger, id_offer])
            }   
        })
    }
    // Finally delete offer from database
    queries.push(`DELETE FROM offer WHERE id = ?`)
    parameters.push([id_offer]);

    return [queries, parameters]
}

exports.deleteOffer = deleteOffer;