

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Notifications', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    creator: {
      type: Sequelize.INTEGER,
      allowNull: false
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
    articleSlug: {
      type: Sequelize.STRING,
      allowNull: true
    },
    eventType: {
      type: Sequelize.STRING,
      allowNull: false
    },
    resourceId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    read: {
      type: Sequelize.BOOLEAN,
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('Notifications')
};
