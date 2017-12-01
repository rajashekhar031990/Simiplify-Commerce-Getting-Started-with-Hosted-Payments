var express = require('express');
var path = require('path');
var Simplify = require("simplify-commerce");

var app = express();

app.get('/', function (req, resp) {
    resp.sendFile('index.html', {root: path.join(__dirname, './files')});
});

var client = Simplify.getClient({
    publicKey:'sbpb_MWMxZDEwZTctMGYwOS00NTQ3LThkZGMtODUzZjA2Y2Q3N2U3',
    privateKey: '9Nnl820hU8KhhZqBKqZCQAJmcLojWLKWVhL740PBK195YFFQL0ODSXAOkNtXTToq'
});

app.get('/payment/create', function (req, res) {

    var cardToken = req.query.cardToken;

    var request = {
        amount : "1000",
        token : cardToken,
        description: "payment description",
        reference : "7a6ef6be31",
        currency: "USD"
    }

    console.log("Creating payment: " + JSON.stringify(request) );

    client.payment.create(request, function (err, data) {

        if (err) {
            console.error("Error Message: " + JSON.stringify(err) );
            return res.send(err);
        }
            res.redirect('/success.html');
    });
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Simplify sample server app listening at http://localhost:%s', port);
});