process.env.NODE_ENV = 'test';

const expect = require('chai').expect;

const accountService = require('../../accounts/account.service');

describe('Test Account Service', function() {

  });

  describe('Testing the hashing and salting of a password', function() {
    it('should hash the password', function(done) {

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

        it('should salt the passwords with different salts', function(done) {

          const password = 'Hello';
  
          const hashedAndSaltedPassword = accountService.saltAndHash(password);
  
          const passwordDuplicate = 'Hello';
  
          const hashedAndSaltedPasswordOfDuplicate = accountService.saltAndHash(passwordDuplicate);
  
          expect(hashedAndSaltedPasswordOfDuplicate).to.not.equal(hashedAndSaltedPassword);

          done();
            }
        );

    });
