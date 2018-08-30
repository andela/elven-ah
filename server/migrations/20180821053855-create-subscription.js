

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Subscriptions', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'userId'
      },
    },
    channelId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Channels',
        key: 'id',
        as: 'channelId'
      },
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
  down: queryInterface => queryInterface.dropTable('Subscriptions')
};
