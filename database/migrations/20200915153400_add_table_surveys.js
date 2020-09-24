module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable(
        'surveys',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          title: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: false
          },
          description: {
            type: Sequelize.TEXT
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
      return queryInterface.dropTable('surveys')
    }
  }
  