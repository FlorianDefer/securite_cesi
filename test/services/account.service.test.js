process.env.NODE_ENV = 'test';

const accountService = require('../../accounts/account.service');
const db = require('../../_helpers/db');

const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const expect = chai.expect;




describe('Test Account Service', function() {

  // before((done) => {
  //  // db.connect();
  //  // done();
  //  //   .then(() => done())
  //  //   .catch((err) => done(err));
  // })

  // after((done) => {
  //  // db.close()
  //  //   .then(() => done())
  //  //   .catch((err) => done(err));
  // })

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

    describe('Testing the create method', function() {
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
        const stub = sinon.stub(db.Account, "findOne").returns(false);
        //const userService = new UserService(userRepo);
        const account = await accountService.create(stubValue)
        //Service.create(stubValue.name, stubValue.email);
        expect(stub.calledOnce).to.be.true;
        //expect(account.id).to.equal(stubValue.id);
        expect(account.title).to.equal(stubValue.title);
        //expect(account.firstName).to.equal(stubValue.firstName);
        expect(account.lastName).to.equal(stubValue.lastName);
        expect(account.role).to.equal(stubValue.role);
  
          // const password = 'Hello';
  
          // const hashedPassword = accountService.saltAndHash(password);
  
          // expect(hashedPassword).to.not.equal(password);
  
          // //Verifier la longueur du hachage
  
          // const passwordDuplicate = 'Hello';
  
          // const hashedPasswordOfDuplicate = accountService.saltAndHash(passwordDuplicate);
  
          // expect(hashedPasswordOfDuplicate).to.not.equal(hashedPassword);
  
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

  });
