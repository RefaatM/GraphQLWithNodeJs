const express = require('express');
const bodyParser = require('body-parser');
const Database = require('./db');
const graphQLServer = require('./graphql/server');
const { version } = require('../package.json');

const PORT = 3000;

const app = express();

const startServer = () => {
  const database = new Database();

  app.disable('x-powered-by');

  app.use(bodyParser.json({ extended: true }));

  const corsOptions = {
    origin: '*',
    credentials: true
  };

  app.get('/', (req, res) => {
    res.json({
      message: 'Welcome to the WorkTango API!',
      version
    });
  });

  graphQLServer.applyMiddleware({
    app,
    cors: corsOptions
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${graphQLServer.graphqlPath}`);
  });
};

module.exports = startServer;
