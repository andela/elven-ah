
export default (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Rating.associate = (models) => {
    Rating.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Rating;
};
