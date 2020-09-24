const Sequelize = require('sequelize');



class SurveyQuestion extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },

        surveyId: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        question: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: false
        },
        questionType: {
          type: Sequelize.STRING,
          allowNull: false
        },
        rangeFrom: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        rangeTo: {
          type: Sequelize.INTEGER,
          allowNull: true
        },

        created: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        updated: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
        },
        deletedAt: {
          type: Sequelize.DATE
        }
      },
      {
        sequelize,
        timestamps: true,
        paranoid: true,
        charset: 'utf8mb4',
        dialectOptions: { collate: 'utf8mb4_bin' },
        tableName: 'surveyquestions',
        updatedAt: 'updated',
        createdAt: 'created'
      }
    );
  }

  /**
   * responsible to associate the model relationships
   * @param {*} models - sequelize models
   */
  static associate(models) { }

  /**
   * Create question
   * @param {*} surveyQuestion- survey question object
   * @returns {Object} - { question, token }
   */
  static async add(surveyQuestion) {
    const {
      surveyId,
      question,
      questionType,
      rangeFrom,
      rangeTo
    } = surveyQuestion;


    const questionObj = {
      surveyId,
      question,
      questionType,
      rangeFrom,
      rangeTo
    };

    return this.create(questionObj);
  }

  /**
   * Update question
   * @param {*} surveyQuestion- survey question object
   * @returns {Object} - { question, token }
   */
  static async updateQuestion(surveyQuestion) {

    return this.update(surveyQuestion, { where: { id: surveyQuestion.id } });
  }
}

module.exports = SurveyQuestion;
