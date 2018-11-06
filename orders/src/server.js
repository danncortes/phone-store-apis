const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const axios = require('axios');
var app = express();
const port = 80;

const { Order } = require('./order-model');

app.use(bodyParser.json());

app.get('/orders', function (req, res) {
  Order.find().then((orders) => {
    res.send({ orders });
  }, (e) => {
      res.status(400).send(e);
  });
});

async function getPhone(id){
  const res = await axios.get(`http://localhost:3030/phones/${id}`)
  .then(res => res).catch(err => err);
  console.log(res)
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
        let totalAmount = 0;
        response.forEach(el => {
          const { nItems } = cart.find(item => item.id === el._id);
          totalAmount += el.price * nItems;
        });
        data.total = totalAmount;
        const order = new Order(data);
        order.save().then((order) => {
            console.log(order)
            res.send(order);
        }, (e) => {
            res.status(400).send(e);
        });
      } else {
        res.status(400).send({error: 'One or more products are out of Stock '});
      }
    })
  }
});

app.listen(port, function () {
  console.log(`Orders Api service listening on port ${port}!`);
});

module.exports.app = app;