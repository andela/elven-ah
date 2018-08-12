
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
        as: 'articleId'
      },
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    parentId: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Comments',
        key: 'id',
        as: 'parentId',
      }
    },
    body: {
      type: Sequelize.TEXT,
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
  down: queryInterface => queryInterface.dropTable('Comments')
};
