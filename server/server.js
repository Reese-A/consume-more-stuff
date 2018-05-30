const express = require('express');
// const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const server = express();
const PORT = process.env.PORT || 9001;

server.use(
  bodyParser.urlencoded({
    extended: true
  })
);
server.use(bodyParser.json());

// server.use('/api', routes);

server.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});

module.exports = server;
