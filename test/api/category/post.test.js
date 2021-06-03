process.env.NODE_ENV = 'test';

const app = require('../../../app.js');
//const conn = require('../../../db/index.js');
const request = require('supertest');

const chai = require('chai');
chai.use(require('sinon-chai'));

const expect = chai.expect;


describe('POST /category/create', () => {
// before((done) => {
// conn.connect()
//   .then(() => done())
//   .catch((err) => done(err));
// })

// after((done) => {
// conn.close()
//   .then(() => done())
//   .catch((err) => done(err));
// })

it('OK, creating a new category works', (done) => {

request(app).post('/category/create')
  .send({ name: 'Health', _userId: 1 })
  .then((res) => {
    console.log(res);
    const body = res.body;
    expect(body).to.contain.property('message');
    done();
  })
  .catch((err) => done(err));
});

it('Fail, category requires user ID', (done) => {
request(app).post('/category/create')
  .send({ name: 'Health' })
  .then((res) => {
    console.log(res);
    const body = res.body;
    expect(body.errors.text.name).to.equal('ValidatorError');
    done();
  })
  .catch((err) => done(err));
});
})
