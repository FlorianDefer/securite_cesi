process.env.NODE_ENV = 'test';

const app = require('../../../app.js');
const accountService = require('../../../accounts/account.service');
//const conn = require('../../../db/index.js');
const request = require('supertest');

const chai = require('chai');
chai.use(require('sinon-chai'));

const expect = chai.expect;


describe('Integration test for: POST /favorite', () => {

it('Should Create a new favourite resource',  async () => {

//First create admin account
const accountAdmin = {
  id: '134ced02ed345b2b049232c7fav',
  title: 'Mr',
  firstName: 'Admin',
  lastName: 'Account',
  email: 'admin.accountfavourite@gmail.com',
  role: 'Admin',
  password: 'YsiteProvoka!BesameLaVoka'
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

//Create favourite resource
request(app).post('/favorite')
  .send({ _resourceId: '214fdsr321ijdas1sasfio', resourceName: 'HealthResource', _userId: accountAdminCreated.id })
  .then((res) => {
    const body = res.body;
    expect(body).to.contain.property('message');
  })
});

it('Should not create a favourite resource for an unauthenticated user', async () => {
request(app).post('/favorite')
  .send({ _resourceId: '237dsr321ijdas1sasfioorlae6', resourceName: 'HealthResource', _userId: accountAdminCreated.id })
  .then((res) => {
    const body = res.body;
    //console.log(res);
    expect(body.status).to.equal(401);
    //expect(res.statusMessage).to.equal('Unauthorized');
    done();
  })
  .catch((err) => done(err));
});


it('Should not create a favourite resource without a user ID', async () => {
request(app).post('/favorite')
  .send({ _resourceId: '214fdsr321ijdas1sasfio', resourceName: 'HealthResource' })
  .then((res) => {
    const body = res.body;
    expect(body.errors).to.equal('ValidatorError');
    done();
  })
  .catch((err) => done(err));
});
})
