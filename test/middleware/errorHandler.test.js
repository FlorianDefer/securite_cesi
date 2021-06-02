process.env.NODE_ENV = 'test';
// https://itnext.io/mocking-expressjs-request-and-response-objects-63405e9c58ff
const errorHandler = require('../../_middleware/error-handler');

const { mockRequest, mockResponse } = require('mock-req-res')
const chai = require('chai');
const sinon = require('sinon');
chai.use(require('sinon-chai'));

const expect = chai.expect;


describe('Test Error Handler', function() {

describe('Test Error Handler from Middleware', function() {

  });

  describe('Testing the error handler for the back-end', function() {

    it('Should handle a custom application error ending with "not found" (not case sensitive) ', function(done) {

        const error = 'We are sorry but your resource is not found';
        const req = mockRequest();
        const res = mockResponse();
        next = {};
        
        //Invoke Error Handler
        errorHandler(error, req, res, next);

        expect(res.status).to.have.been.calledOnce;
        expect(res.status).to.have.been.calledWith(404);

        const expected = {message: error}

        expect(res.json).to.have.been.calledWith(expected);

        done();
          }
        );

    it('Should handle a custom application error NOT ending with "not found" (not case sensitive) ', function(done) {

        const error = 'This is a custom application error. Sorry, but we cannot help you at this time.';
        const req = mockRequest();
        const res = mockResponse();
        next = {};
            
        //Invoke Error Handler
        errorHandler(error, req, res, next);
    
        expect(res.status).to.have.been.calledOnce;
        expect(res.status).to.have.been.calledWith(400);
    
        const expected = {message: error}
    
        expect(res.json).to.have.been.calledWith(expected);
    
        done();
            }
        );

    it('Should handle a Mongoose validation error', function(done) {

        const error = {name: 'ValidationError', message: 'Mongoose schema not valid'};
        const req = mockRequest();
        const res = mockResponse();
        next = {};
            
        //Invoke Error Handler
        errorHandler(error, req, res, next);
    
        expect(res.status).to.have.been.calledOnce;
        expect(res.status).to.have.been.calledWith(400);
    
        const expected = {message: error.message}
    
        expect(res.json).to.have.been.calledWith(expected);
    
        done();
            }
    );

    it('Should handle a jwt authentication error', function(done) {

        const error = {name: 'UnauthorizedError', message: 'Unauthorized'};
        const req = mockRequest();
        const res = mockResponse();
        next = {};
            
        //Invoke Error Handler
        errorHandler(error, req, res, next);
    
        expect(res.status).to.have.been.calledOnce;
        expect(res.status).to.have.been.calledWith(401);
    
        const expected = {message: error.message}
    
        expect(res.json).to.have.been.calledWith(expected);
    
        done();
            }
    );

    it('Should handle any type of error by sending a response status of 500', function(done) {

        const error = {name: 'Unknown Error', message: 'Unknown Error. Please bear with us while we are solving the issue.'};
        const req = mockRequest();
        const res = mockResponse();
        next = {};
            
        //Invoke Error Handler
        errorHandler(error, req, res, next);
    
        expect(res.status).to.have.been.calledOnce;
        expect(res.status).to.have.been.calledWith(500);
    
        const expected = {message: error.message}
    
        expect(res.json).to.have.been.calledWith(expected);
    
        done();
            }
    );

    });

});
