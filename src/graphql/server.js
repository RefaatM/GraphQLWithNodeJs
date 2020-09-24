const { ApolloServer } = require('apollo-server-express');
const Schema = require('./schema');

const graphQLServer = new ApolloServer({
  schema: Schema,
  context: async context => {
    return context;
  },
  tracing: true
});

module.exports = graphQLServer;
