const http = require('http');
const port = 3000;

var message = {
    offers : [
        {id : 0, user : "user1", start : "IMT", end : "Carefour", date : "25/06", time : "09h58", cost : 0, places :2, comment : "Canabis pas cher au i8 !!!"},
        {id : 1, user : "user1", start : "Carefour", end : "IMT", date : "25/06", time : "20h10", cost : 0,  places :1, comment : "Vive QUCS !"},
        {id : 2, user : "user2", start : "Aéroport", end : "Carefour", date : "25/06",  time : "05h10", cost : 0, places : 3, comment : "J'aime me battre :)"},
        {id : 3, user : "user3", start : "Gare", end : "IMT", date : "26/06",  time : "10h30", cost : 0, places : 1, comment : "Je vais envoyer un message très tard dans le groupe IMT A car je ne prévois rien dans ma vie."},
        {id : 4, user : "user4", start : "Aéroport", end : "Gare", date : "15/06",  time : "12h30", cost : 50, places : 1, comment : "Je suis le Uber de l'IMT. Je coûte très cher"}
    ],
    msg : "Bonjour à toi jeune Atlante !"
};

const server = http.createServer( (req,res) => {
    console.log(req.method, req.url, req.headers);   
    let body = '';
    req.on('data', (chunk) => {
        body += chunk;
    });
    req.on('end', () => {
        console.log(body)
        res.write(JSON.stringify(message)); 
        res.end(); 
    });
})

server.listen(port, function(error) {
    if (error) {
        console.log("ERREUR")
    } else {
        console.log("Ecoute sur port " + port)
    }
})