const {
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType
  
} = require('graphql');

const QuestionTypeEnum = new GraphQLEnumType({
  name: 'QuestionTypeEnum',
  values:{
     OpenText: {value: 'OpenText'} ,
     Range: {value: 'Range'}
    }
  } );

const SurveyQuestion = new GraphQLObjectType({
  name: 'surveyQuestion',
  description: 'This represents the details of the surveyQuestion model',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve (surveyQuestion) {
        return surveyQuestion.id;
      }
    },
    surveyId: {
      type: GraphQLInt,
      resolve (surveyQuestion) {
        return surveyQuestion.surveyId;
      }
    },
    question: {
      type: GraphQLString,
      resolve (surveyQuestion) {
        return surveyQuestion.question;
      }
    },
    questionType: {
      type: QuestionTypeEnum, // GraphQLString,
      resolve (surveyQuestion) {
        return surveyQuestion.questionType;
      }
    },
    rangeFrom:{
      type: GraphQLInt,
      resolve(surveyQuestion) {
        return surveyQuestion.rangeFrom;
      }
    },
    rangeTo: { 
      type: GraphQLInt,
      resolve(surveyQuestion) {
        return surveyQuestion.rangeTo;
      },
    
    created: {
      type: GraphQLString,
      resolve (surveyQuestion) {
        return surveyQuestion.created;
      }
    },
    updated: {
      type: GraphQLString,
      resolve (surveyQuestion) {
        return surveyQuestion.updated;
      }
    },
    deletedAt: {
      type: GraphQLString,
      resolve (surveyQuestion) {
        return surveyQuestion.deletedAt;
      }
    }
  }
})
});


const SurveyQuestionLiteInput = new GraphQLInputObjectType({
  name: 'SurveyQuestionLiteInput',
  description: 'Input for surveyQuestion',
  fields: () => ({
    
    question: { type: new GraphQLNonNull(GraphQLString) },
    questionType: {type: new GraphQLNonNull(QuestionTypeEnum)},
    rangeFrom:{ type: GraphQLInt},
    rangeTo: { type: GraphQLInt},
  })
});

const SurveyQuestionLiteWithIdInput = new GraphQLInputObjectType({
  name: 'SurveyQuestionLiteWithIdInput',
  description: 'Input for surveyQuestion',
  fields: () => ({
    id:{ type: new GraphQLNonNull(GraphQLInt)},
    question: { type: new GraphQLNonNull(GraphQLString) },
    questionType: {type: new GraphQLNonNull(QuestionTypeEnum)},
    rangeFrom:{ type: GraphQLInt},
    rangeTo: { type: GraphQLInt},
  })
});;

const SurveyQuestionInput = new GraphQLInputObjectType({
  name: 'SurveyQuestionInput',
  description: 'Input for surveyQuestion',
  fields: () => ({
    id:{ type: new GraphQLNonNull(GraphQLInt)},
    surveyId: { type: new GraphQLNonNull(GraphQLInt)},
    question: { type: new GraphQLNonNull(GraphQLString) },
    questionType: {type: new GraphQLNonNull(QuestionTypeEnum)},
    rangeFrom:{ type: GraphQLInt},
    rangeTo: { type: GraphQLInt},
  })
});

const SurveyQuestionSearchInput = new GraphQLInputObjectType({
  name: 'SurveyQuestionSearchInput',
  description: 'Search Input for surveyQuestion',
  fields: () => ({
    question: { type: GraphQLString },
    surveyId: { type: GraphQLInt}
  })
});


module.exports = {
  SurveyQuestion,
  SurveyQuestionInput,
  SurveyQuestionLiteInput,
  SurveyQuestionLiteWithIdInput,
  SurveyQuestionSearchInput,
  QuestionTypeEnum
};
