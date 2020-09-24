module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
        'surveyquestions',
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
            type: Sequelize.STRING
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
            defaultValue: Sequelize.literal('NOW()')
          },
          updated: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
          },
          deletedAt: {
            type: Sequelize.DATE
          }
        },
        {
          timestamps: true,
          paranoid: true,
          updatedAt: 'updated',
          createdAt: 'created'
        }
      )
    },
  
    down: queryInterface => {
      return queryInterface.dropTable('surveyquestions')
    }
  }
  