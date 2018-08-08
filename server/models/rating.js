
export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleSlug: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  Rating.associate = (models) => {
    Rating.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Rating.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'rater',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Rating;
};
