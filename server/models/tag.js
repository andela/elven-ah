
export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Tag.associate = (models) => {
    Tag.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Tag;
};
