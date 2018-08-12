
export default (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  Comment.associate = (models) => {
    Comment.belongsTo(models.Article, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Comment.hasMany(models.Reply, {
      foreignKey: 'commentId',
      as: 'replies'
    });
  };
  return Comment;
};
