const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const port = 3030;

const { Phone } = require('./phone-model');

app.use(bodyParser.json());

app.get('/phones', function (req, res) {
  Phone.find().then((phones) => {
    res.send({ phones });
  }, (e) => {
      res.status(400).send(e);
  });
});

app.post('/order', function (req, res) {
});

app.listen(port, function () {
  console.log(`Phones Api service listening on port ${port}!`);
});