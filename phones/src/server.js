const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const axios = require('axios');
var app = express();
const port = 80;

const { Phone } = require('./phone-model');

app.use(bodyParser.json());

app.get('/phones', function (req, res) {
  Phone.find().then((phones) => {
    res.send({ phones });
  }, (e) => {
      res.status(400).send(e);
  });
});

app.get('/phones/:id', function (req, res) {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
      res.status(404).send();
  }

  Phone.find({ _id: id, stock: { $gte: 1 }}).then((phone) => {
      if (!phone) {
          res.status(404).send();
      }
      res.send(phone[0]);
  }).catch((e) => {
      res.status(400).send();
  });
});

app.listen(port, function () {
  console.log(`Phones Api service listening on port ${port}!`);
});

module.exports.app = app;