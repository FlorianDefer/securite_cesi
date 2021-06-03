process.env.NODE_ENV = 'test';

const app = require('../../../app.js');
const accountService = require('../../../accounts/account.service');
//const conn = require('../../../db/index.js');
const request = require('supertest');

const chai = require('chai');
chai.use(require('sinon-chai'));

const expect = chai.expect;


describe('Integration test for: POST /comment', () => {

it('Should Create a new comment',  async () => {

//First create admin account
const accountAdmin = {
  id: '134ced02ed345b2b049232c7comment',
  title: 'Mr',
  firstName: 'Admin',
  lastName: 'Account',
  email: 'admin.accountcomment@gmail.com',
  role: 'Admin',
  password: 'YsiteProvoka!342'
};

const accountAdminCreated = await accountService.create(accountAdmin);

//{ email, password, ipAddress }
//Then authenticate
request(app).post('accounts/authenticate')
  .send({ email: accountAdminCreated.email, password: accountAdmin.password})
  .then((res) => {
   // console.log(res);
  })
  .catch((err) => done(err));

//Create comment
request(app).post('/comment')
  .send({ content: 'Je suis un commentaire', dateCreated: Date.now, public: true, _userId: accountAdminCreated.id })
  .then((res) => {
    const body = res.body;
    expect(body).to.contain.property('message');
  })
});

it('Should not create a comment for an unauthenticated user', async () => {
request(app).post('/comment')
  .send({ content: 'Je suis un commentaire', dateCreated: Date.now, public: true, _userId: 123456 })
  .then((res) => {
    const body = res.body;
    //console.log(res);
    expect(body.status).to.equal(401);
    //expect(res.statusMessage).to.equal('Unauthorized');
    done();
  })
  .catch((err) => done(err));
});


it('Should not create a comment without a user ID', async () => {
request(app).post('/comment')
  .send({ content: 'Je suis un commentaire', dateCreated: Date.now, public: true })
  .then((res) => {
    const body = res.body;
    expect(body.errors).to.equal('ValidatorError');
    done();
  })
  .catch((err) => done(err));
});
})
