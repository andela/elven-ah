module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Tags', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    articleId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        model: 'Articles',
        key: 'id',
        as: 'articleId'
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      allowNull: true,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: true,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable('Tags')
};
