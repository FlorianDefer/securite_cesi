process.env.NODE_ENV = 'test';

const app = require('../../../app.js');
const accountService = require('../../../accounts/account.service');
const request = require('supertest');

const chai = require('chai');
chai.use(require('sinon-chai'));

const expect = chai.expect;

describe('Integration test for: GET /category/get', () => {

  it('Should get no categories as there are no categories',  async () => {
    request(app).get('/category/get')
      .then((res) => {
        const body = res.body;
        expect(body.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it('Should get one category as there is only one category (after it has been posted)',  async () => {

    //First create admin account
    const accountAdmin = {
    id: '134zxed02ed345b2b049232c7',
    title: 'Mr',
    firstName: 'Admin',
    lastName: 'Account',
    email: 'admin.accountCat@gmail.com',
    role: 'Admin',
    password: 'YsiteProvoka!342'
  };
  
  const accountAdminCreated = await accountService.create(accountAdmin);
  
  //Then authenticate
  request(app).post('accounts/authenticate')
    .send({ email: accountAdminCreated.email, password: accountAdmin.password})
    .then((res) => {
    })
    .catch((err) => done(err));
  
  //Create category
  request(app).post('/category/create')
    .send({ name: 'Finances', _userId: 1543 })
    .then((res) => {
        request(app).get('/category/get')
        .then((res) => {
          const body = res.body;
          expect(body.length).to.equal(1);
          done();
        })
    })
    .catch((err) => done(err));

  });
})