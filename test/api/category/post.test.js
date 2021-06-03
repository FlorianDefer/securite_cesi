process.env.NODE_ENV = 'test';

const app = require('../../../app.js');
const accountService = require('../../../accounts/account.service');
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

//statusCode: 401,
//statusMessage: 'Unauthorized',

it('OK, creating a new category works', (done) => {

//First create admin account
const accountAdmin = {
  id: '134ced02ed345b2b049232c7',
  title: 'Mr',
  firstName: 'Admin',
  lastName: 'Account',
  email: 'admin.account@gmail.com',
  role: 'Admin',
  password: 'YsiteProvoka!342'
};

const accountAdminCreated = accountService.create(accountAdmin);

//{ email, password, ipAddress }
//Then authenticate
request(app).post('accounts/authenticate')
  .send({ email: accountAdminCreated.email, password: accountAdmin.password})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => done(err));


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
