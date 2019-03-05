var express = require('express');
var http = require('http')
var https = require('https')
var hostname = 'localhost';
var port = 3000;

var app = express();

var myRouter = express.Router();

myRouter.route('')

    .all(function(req, res) {
        res.json({
            message: "Mauvais chemin, pour récupérer les données des dates, utilisez /info",
            methode: req.method
        });
    })


myRouter.route('/info').get(function(req, res) {
    let date = req.query.date
    url = 'http://numbersapi.com/' + date;
    let callback = function(response) {
        var body = "";
        response.on('data', function(data) {   //La requête attend la réponse "data"
            body += data;                         //Puis rempli "body" avec la data
        })
        response.on('end', function() {
            res.send(body)                    //Une fois que la requête reçoit "end", J'envoie "body" à ma web app
        })
    }
    let test = http.request(url, callback).end();
})

app.use(myRouter);

app.listen(port, hostname, function() {
    console.log("Mon serveur fonctionne sur http://" + hostname + ":" + port + "\n");
});
