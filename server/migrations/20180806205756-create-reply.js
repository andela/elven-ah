
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Replies', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    commentId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Comments',
        key: 'id',
        as: 'commentId'
      },
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
  down: queryInterface => queryInterface.dropTable('Replies')
};
