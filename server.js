console.log('start1')
const http = require('http');
console.log('start2')
const app = require('./app');
console.log('start3')
//app.enable('trust proxy');
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
console.log('1')
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);
console.log('2')
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};
console.log('3')
const server = http.createServer(app);
console.log('4')
server.on('error', errorHandler);



server.listen(3000,function(){  
  console.log('Express app start on port 3000')  
});