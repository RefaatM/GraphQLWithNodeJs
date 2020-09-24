const { GraphQLObjectType, GraphQLSchema } = require('graphql');


const surveyMutations = require('./survey/mutations');
const surveyQueries = require('./survey/queries');

const query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    ...surveyQueries
  })
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'This is the root mutation',
  fields: () => ({
    ...surveyMutations
  })
});

const Schema = new GraphQLSchema({
  // types: [], // WE NOTICED THE TYPES ARE ALREADY FOUND THROUGH THE QUERY AND MUTATIONS
  // TYPES ARE only required here if they do not show up in any query or mutation(which is not the case today)
  query,
  mutation
});

module.exports = Schema;
