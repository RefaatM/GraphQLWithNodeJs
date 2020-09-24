const { ApolloError } = require('apollo-server');

const graphqlError = error => {
  const code = error.code || error.statusCode || 500;
  const message = error.message || error.msg || '';
  const apolloError = new ApolloError(message, code, error);

  console.log(`GraphQL Error ${message}`, error);

  return apolloError;
};

const sequelizeOptionQuery = (args, model, queryType = 'findAll') => {
  const {
    search,
    offset,
    limit,
    include,
    order
  } = args;
  const query = {
    limit,
    offset,
    include
  };

  if (search) {
    query.where = {
      ...search
    };
  }

  if (order) {
    query.order = Sequelize.literal(order);
  }

  return model[queryType](query);
};

module.exports = {
  graphqlError,
  sequelizeOptionQuery
};
