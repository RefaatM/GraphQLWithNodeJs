/**
 * @description       : 
 * @author            : ChangeMeIn@UserSettingsUnder.SFDoc
 * @group             : 
 * @last modified on  : 09-16-2020
 * @last modified by  : ChangeMeIn@UserSettingsUnder.SFDoc
 * Modifications Log 
 * Ver   Date         Author                               Modification
 * 1.0   09-16-2020   ChangeMeIn@UserSettingsUnder.SFDoc   Initial Version
**/
const { GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const {
  Survey,
  SurveySearchInput
} = require('./types');
const SurveyModel = require('../../db/survey');
const { sequelizeOptionQuery } = require('../../helpers/graphql_helper');

const QuestionModel = require('../../db/question');
const { SurveyQuestion, SurveyQuestionSearchInput } = require('./questiontypes');

const queries = {
  survey: {
    type: Survey,
    args: {
      id: {
        type: new GraphQLNonNull(GraphQLInt)
      }
    },
    resolve(_, args, ctx) {
      return SurveyModel.findByPk(args.id);
    }
  },
  surveys: {
    type: new GraphQLList(Survey),
    args: {
      limit: { type: GraphQLInt, defaultValue: 20 },
      offset: { type: GraphQLInt, defaultValue: 0 },
      search: { type: SurveySearchInput }
    },
    resolve(_, args, ctx) {
      if (!args.search) { args.search = {}; }
      return sequelizeOptionQuery(args, SurveyModel);
    }
  },
  questions: {
    type: new GraphQLList(SurveyQuestion),
    args: {
      limit: { type: GraphQLInt, defaultValue: 20 },
      offset: { type: GraphQLInt, defaultValue: 0 },
      search: { type: SurveyQuestionSearchInput }
    },
    resolve(_, args, ctx) {
      if (!args.search) { args.search = {}; }
      return sequelizeOptionQuery(args, QuestionModel);
    }
  },
};

module.exports = queries;
