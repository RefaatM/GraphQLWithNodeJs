const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList

} = require('graphql');

const QuestionModel = require('../../db/question');
const { SurveyQuestion, SurveyQuestionSearchInput } = require('./questiontypes');
const { sequelizeOptionQuery } = require('../../helpers/graphql_helper')

const Survey = new GraphQLObjectType({
  name: 'Survery',
  description: 'This represents the details of the Survery model',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve(survey) {
        return survey.id;
      }
    },
    title: {
      type: GraphQLString,
      resolve(survey) {
        return survey.title;
      }
    },
    description: {
      type: GraphQLString,
      resolve(survey) {
        return survey.description;
      }
    },
    questions: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SurveyQuestion))),
      resolve(survey) {
        if (survey.id != null) {
          const qargs = {
            search: { surveyId: survey.id },
            limit: 20,
            offset: 0
          };
          return sequelizeOptionQuery(qargs, QuestionModel);
        }
        else {
          return null;
        }
      }
    },
    created: {
      type: GraphQLString,
      resolve(survey) {
        return survey.created;
      }
    },
    updated: {
      type: GraphQLString,
      resolve(survey) {
        return survey.updated;
      }
    },
    deletedAt: {
      type: GraphQLString,
      resolve(survey) {
        return survey.deletedAt;
      }
    }
  })
});


const SurveyInput = new GraphQLInputObjectType({
  name: 'SurveyInput',
  description: 'Input for Survey',
  fields: () => ({
    title: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString }
  })
});

const SurveySearchInput = new GraphQLInputObjectType({
  name: 'SurveySearchInput',
  description: 'Search Input for Survey',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});




module.exports = {
  Survey,
  SurveyInput,
  SurveySearchInput
};
