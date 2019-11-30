const http = require('http');
const app = require('./app.js');

const port = 3019;
console.log("Server started on port " + port);
const server = http.createServer(app);

server.listen(port);

