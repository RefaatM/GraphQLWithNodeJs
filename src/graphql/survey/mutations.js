const { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLList, GraphQLObjectType } = require('graphql');
const { graphqlError } = require('../../helpers/graphql_helper');
const SurveyModel = require('../../db/survey');
const { Survey, SurveyInput, SurveySearchInput } = require('./types');
const QuestionModel = require('../../db/question');
const { SurveyQuestion, SurveyQuestionInput, SurveyQuestionLiteWithIdInput, SurveyQuestionLiteInput, QuestionTypeEnum } = require('./questiontypes');


const mutations = {
  addSurvey: {
    type: Survey,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      questions: { type: new GraphQLList(new GraphQLNonNull(SurveyQuestionLiteInput)) }
    },
    async resolve(_, args) {
      const {
        title,
        description,
        questions
      } = args;

      try {
        const newSurvey = await SurveyModel.add({
          title,
          description
        });
        const surveyId = newSurvey.id;
        if (typeof questions === 'undefined') {

        } else {
          if (questions != null) {
            var promises = [];
            questions.forEach(surveyquestion => {
              var {

                question,
                questionType,
                rangeFrom,
                rangeTo
              } = surveyquestion;
              promises.push(QuestionModel.add({
                surveyId,
                question,
                questionType,
                rangeFrom,
                rangeTo
              }));

            });
          };
          await Promise.all(promises);
        }
        return await SurveyModel.findByPk(surveyId);
      }
      catch (error) {
        return graphqlError(error);
      }
    }
  },
  updateSurvey: {
    type: Survey,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: GraphQLString },
      questions: { type: new GraphQLList(new GraphQLNonNull(SurveyQuestionLiteWithIdInput)) }
    },
    async resolve(_, args) {
      const {
        id,
        title,
        description,
        questions
      } = args;

      try {
        var surveyId = id.toString();
        const newSurvey = SurveyModel.findByPk(id);
        newSurvey.title = title;
        newSurvey.description = description;
        var whereClause = { where: { id: id } };
        await SurveyModel.updateSurvey(newSurvey);
        if (typeof questions === 'undefined') {

        } else {

          if (questions != null) {
            var promises = [];
            questions.forEach(surveyQuestion => {
              promises.push(QuestionModel.updateQuestion(surveyQuestion));
            }

            );
            await Promise.all(promises);
          }
          return await SurveyModel.findByPk(surveyId);

        }
      }
      catch (error) {
        return graphqlError(error);
      }
    }
  },

  addQuestion: {
    type: SurveyQuestion,
    args: {
      surveyId: { type: new GraphQLNonNull(GraphQLInt) },
      question: { type: new GraphQLNonNull(GraphQLString) },
      questionType: { type: new GraphQLNonNull(QuestionTypeEnum) },
      rangeFrom: { type: GraphQLInt },
      rangeTo: { type: GraphQLInt }

    },
    async resolve(_, args) {
      const {
        surveyId,
        question,
        questionType,
        rangeFrom,
        rangeTo
      } = args;

      try {
        const newQuestion = await QuestionModel.add({
          surveyId,
          question,
          questionType,
          rangeFrom,
          rangeTo
        });
        return newQuestion;
      } catch (error) {
        return graphqlError(error);
      }
    }
  },

  updateQuestion: {
    type: SurveyQuestion,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      surveyId: { type: new GraphQLNonNull(GraphQLInt) },
      question: { type: new GraphQLNonNull(GraphQLString) },
      questionType: { type: new GraphQLNonNull(QuestionTypeEnum) },
      rangeFrom: { type: GraphQLInt },
      rangeTo: { type: GraphQLInt }

    },
    async resolve(_, args) {
      const {
        id,
        surveyId,
        question,
        questionType,
        rangeFrom,
        rangeTo
      } = args;

      try {
        const newQuestion = await QuestionModel.updateQuestion({
          id,
          surveyId,
          question,
          questionType,
          rangeFrom,
          rangeTo
        });
        return QuestionModel.findByPk(id);
      } catch (error) {
        return graphqlError(error);
      }
    }
  },
};

module.exports = mutations;
