
export default (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
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
