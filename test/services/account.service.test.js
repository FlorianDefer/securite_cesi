process.env.NODE_ENV = 'test';

const accountService = require('../../accounts/account.service');
const db = require('../../_helpers/db');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const expect = chai.expect;




describe('Test Account Service', function() {

  describe('Testing the hashing and salting of a password', function() {
    it('Should hash the password', function(done) {

        const password = 'Hello';

        const hashedPassword = accountService.saltAndHash(password);

        expect(hashedPassword).to.not.equal(password);

        //Verifier la longueur du hachage

        const passwordDuplicate = 'Hello';

        const hashedPasswordOfDuplicate = accountService.saltAndHash(passwordDuplicate);

        expect(hashedPasswordOfDuplicate).to.not.equal(hashedPassword);

        done();
          }
        );

        it('Should salt passwords (with the same string value) with different salts', function(done) {

          const password = 'Hello';
  
          const hashedAndSaltedPassword = accountService.saltAndHash(password);
  
          const passwordDuplicate = 'Hello';
  
          const hashedAndSaltedPasswordOfDuplicate = accountService.saltAndHash(passwordDuplicate);
  
          expect(hashedAndSaltedPasswordOfDuplicate).to.not.equal(hashedAndSaltedPassword);

          done();
            }
        );

    });

    describe('Testing the create function', function() {
      it('Should create a new account', async function() {

        const stubValue = {
          id: 1232,
          title: 'Mr',
          fistName: 'Andy',
          lastName: 'Mijo',
          email: 'pendejue@hotmail.com',
          role: 'ConnectedCitizen',
          password: 'YsiteProvoka'
        };

        
        //const userRepo = new UserRepository();
        //const stub = sinon.stub(db.Account, "findOne").returns(false);
        //const userService = new UserService(userRepo);
        const account = await accountService.create(stubValue)
        //Service.create(stubValue.name, stubValue.email);
        //expect(stub.calledOnce).to.be.true;
        //expect(account.id).to.equal(stubValue.id);
        expect(account.title).to.equal(stubValue.title);
        //expect(account.firstName).to.equal(stubValue.firstName);
        expect(account.lastName).to.equal(stubValue.lastName);
        expect(account.role).to.equal(stubValue.role);
  
            }
          );
      });


      describe('Testing the getAccount function', function() {
        it('Should correctly retrieve an account by its id', async function() {
  
          const accountMock = {
            id: 1983,
            title: 'Mr',
            fistName: 'Giovanni',
            lastName: 'Giorgio',
            email: 'givonanni.giorgio@gmail.com',
            role: 'ConnectedCitizen',
            password: 'YsiteProvoka!342'
          };
  

          const accountCreated = await accountService.create(accountMock);

          // Call the getAccount function
          const accountRetrieved = await accountService.getAccount(accountCreated.id);

          expect(accountRetrieved.id).to.equal(accountCreated.id);
          expect(accountRetrieved.firstName).to.equal(accountCreated.firstName);
          expect(accountRetrieved.lastName).to.equal(accountCreated.lastName);
          expect(accountRetrieved.email).to.equal(accountCreated.email);
          expect(accountRetrieved.role).to.equal(accountCreated.role);
              }
            );

        it('Should throw "Account not found" when id format is not correct', async function() {
  
          const accountMockWithFaultyID = {
            id: 'geeks',
            title: 'Mr',
            fistName: 'Giovanni',
            lastName: 'Giorgio',
            email: 'givonanni.giorgio@gmail.com',
            role: 'ConnectedCitizen',
            password: 'YsiteProvoka!342'
          };
      
    
          //const accountCreated = await accountService.create(accountMock);
          // Call the getAccount function
          expect(await accountService.getAccount(accountMockWithFaultyID.id)).to.throw(new Error('Account not found'));
          }
        );

        it('Should throw "Account not found" when there is no account in the database with the provided id', async function() {
  
          const accountMock = {
            id: 93197129,
            title: 'Ms',
            fistName: 'Luy',
            lastName: 'Araz',
            email: 'araz.luy@gmail.com',
            role: 'ConnectedCitizen',
            password: 'omghsiuehoteal'
          };
      
    
          const accountCreated = await accountService.create(accountMock);
          // Call the getAccount function
          expect(await accountService.getAccount('6jhr32shfds41nfd213')).to.throw(new Error('Account not found'));
          }
        );

        });


  });
