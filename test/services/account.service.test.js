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

          //Special code for throwing errors in asynchronous functions:
          // async function foo() {throw new Error("Foo");}
          // it("`foo` throws an async error (rejected Promise)", () => {
          // return foo().catch(error => expect(error).to.be.an('error').with.property('message', 'Foo'))
          //});
      
          //const accountCreated = await accountService.create(accountMock);
          // Call the getAccount function
          return accountService.getAccount(accountMockWithFaultyID.id).catch(error => expect(error).equal('Account not found'));
          //expect(await accountService.getAccount(accountMockWithFaultyID.id)).to.throw(new Error('Account not found'));
          }
        );

        it('Should throw "Account not found" when there is no account in the database with the provided id', async function() {
  
          const accountMock = {
            id: '594ced02ed345b2b049222c5',
            title: 'Ms',
            fistName: 'Luy',
            lastName: 'Araz',
            email: 'araz.luy@gmail.com',
            role: 'ConnectedCitizen',
            password: 'omghsiuehoteal'
          };
      
          const accountCreated = await accountService.create(accountMock);
          // Call the getAccount function
          return accountService.getAccount(accountMock.id).catch(error => expect(error).equal('Account not found'));
          //expect(await accountService.getAccount('6jhr32shfds41nfd213')).to.throw(new Error('Account not found'));
          }
        );

        });

        describe('Testing the register function', function() {
          it('Should correctly register an account', async function() {
    
            const accountMock = {
              id: '524cad02ed315b3b045243c1',
              title: 'X',
              fistName: 'Neutral',
              lastName: 'Name',
              email: 'neutral.name@yahoo.com',
              role: 'ConnectedCitizen',
              password: 'Ykldjsnbakl738ji!LKF'
            };

            console.log(accountService.getAll());

            numberOfAccountsBefore = accountService.getAll().length;

            console.log(numberOfAccountsBefore);

            //length of accounts in database increases by 1.
            await accountService.register(accountMock);

            numberOfAccountsAfter = accountService.getAll().length;

            expect(numberOfAccountsAfter).to.equal(numberOfAccountsBefore + 1);

            //Same id cannot be re-registered
            return accountService.register(accountMock).catch(error => expect(error).equal('Email "' + accountMock.email + '" is already registered'));
  
                }
              );
  
          it('Should throw "The Input Password is less than or equal to 10 characters long. Please choose a password of more than 10 characters." when password is less than 11 characters long', async function() {
    
            const accountWithShortPassword = {
              id: '524cad32ed315b3c045243c1',
              title: 'Mr',
              fistName: 'Giovanni',
              lastName: 'Giorgio',
              email: 'givonannissimo.giorgio@gmail.com',
              role: 'ConnectedCitizen',
              password: 'TooShort'
            };

            return accountService.register(accountWithShortPassword).catch(error => expect(error).equal('The Input Password is less than or equal to 10 characters long. ' + 
            'Please choose a password of more than 10 characters.'));
  
            }
          );
  
          it('Should throw "The Input Password does not have: a minimum of eleven characters, at least one uppercase letter, at least one lowercase letter, at least one number and at least one special character. Please choose a password that fulfills the above criteria for maximum password protection." when the password does not fulfill the desired format', async function() {
    
            const accountWithNotSecurePassword = {
              id: '514ced02ed335b2b049122c5',
              title: 'Ms',
              fistName: 'Luy',
              lastName: 'Araz',
              email: 'arazidsa.luy@gmail.com',
              role: 'ConnectedCitizen',
              password: 'IamNotASecurePasswordDespiteBeingLong'
            };
        
            return accountService.register(accountWithNotSecurePassword).catch(error => expect(error).equal('The Input Password does not have: a minimum of eleven characters, at least one uppercase letter, '
            + 'at least one lowercase letter, at least one number and at least one special character. ' + 
            'Please choose a password that fulfills the above criteria for maximum password protection.'));

            }
          );
  
          });


  });
