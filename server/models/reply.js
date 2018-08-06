
export default (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
  });
  Reply.associate = (models) => {
    Reply.belongsTo(models.Comment, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
      OnUpdate: 'CASCADE'
    });
  };
  return Reply;
};
