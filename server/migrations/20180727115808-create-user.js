module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: Sequelize.INTEGER,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    googleId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    facebookId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    twitterId: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    verified: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    bio: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    image: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface) => { queryInterface.dropTable('Users'); },
};
