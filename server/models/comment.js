
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Comment.hasMany(models.Comment, {
      foreignKey: 'parentId',
      as: 'replies',
    });
    Comment.belongsTo(models.Comment, {
      foreignKey: 'parentId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Comment;
};
