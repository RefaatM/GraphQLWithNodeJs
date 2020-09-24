const Sequelize = require('sequelize');



class Survey extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        description: {
          type: Sequelize.TEXT
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
        tableName: 'surveys',
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
   * Create Survey
   * @param {*} survey - survey object
   * @returns {Object} - { survey, token }
   */
  static async add(survey) {
    const {
      title,
      description
    } = survey;


    const surveyObj = {
      title,
      description
    };

    return this.create(surveyObj);
  }

  /**
     * Update Survey
     * @param {*} survey - survey object
     * @returns {Object} - { survey, token }
     */
  static async updateSurvey(survey) {

    this.update(survey, { where: { id: survey.id } });
  }

}

module.exports = Survey;
