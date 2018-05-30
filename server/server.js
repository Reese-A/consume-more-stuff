const express = require('express');
// const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 9001;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

// app.use('/api', routes);

app.listen(PORT, () => {
  process.stdout.write(`Server listening on port: ${PORT}`);
});

module.exports = app;
