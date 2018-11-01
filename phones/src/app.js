var express = require('express');
var app = express();
const port = 3030;

const { Phone } = require('./phone-model');

app.get('/phones', function (req, res) {
  res.send('Hello World!');
});


app.listen(port, function () {
  console.log(`Phones Api service listening on port ${port}!`);
});