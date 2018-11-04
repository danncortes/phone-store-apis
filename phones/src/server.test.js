let chai = require('chai');
const request = require('supertest');
let {app} = require('./server');


describe('/GET Phones', () => {
  it('Should return hello world response', (done) => {
    request(app)
      .get('/phones')
      .expect(200)
      .end(done);
  });
});