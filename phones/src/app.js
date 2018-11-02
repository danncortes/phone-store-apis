const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const axios = require('axios');
var app = express();
const port = 3030;

const { Phone } = require('./phone-model');
const { Order } = require('./order-model');

app.use(bodyParser.json());

app.get('/phones', function (req, res) {
  Phone.find().then((phones) => {
    res.send({ phones });
  }, (e) => {
      res.status(400).send(e);
  });
});

app.get('/orders', function (req, res) {
  Order.find().then((orders) => {
    res.send({ orders });
  }, (e) => {
      res.status(400).send(e);
  });
});

app.get('/phones/:id', function (req, res) {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
      res.status(404).send();
  }

  Phone.findById(id).then((phone) => {
      if (!phone) {
          res.status(404).send();
      }
      res.send(phone);
  }).catch((e) => {
      res.status(400).send();
  });
});

async function getPhone(id){
  const res = await axios.get(`http://localhost:3030/phones/${id}`).then(res => res).catch(err => err);
  return res;
}

async function verifyOrder(cart){
  let products = [];
  for(let i=0; i < cart.length; i++){
    const phone = await getPhone(cart[i].id);
    if(phone.data){
      products.push(phone.data)
    }
  }
  return products;
}

app.post('/order', function (req, res) {
  const data = req.body;
  const {cart} = data;
  let products = [];
  if(cart.length){
    verifyOrder(cart).then(response =>{
      if(response.length === cart.length){
        const totalAmount = response.reduce((a,b)=>a.price + b.price)
        data.total = totalAmount;
        const order = new Order(data);
        order.save().then((order) => {
            console.log(order)
            res.send(order);
        }, (e) => {
            res.status(400).send(e);
        });
      } else {
        res.status(400).send({error: 'Products not found'});
      }
    })
  }
});

app.listen(port, function () {
  console.log(`Phones Api service listening on port ${port}!`);
});