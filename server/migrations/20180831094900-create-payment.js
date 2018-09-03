module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Payments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      },
    },
    transactionReference: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    subscriptionType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dueDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => { queryInterface.dropTable('Payments'); },

};
