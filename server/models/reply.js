
export default (sequelize, DataTypes) => {
  const Reply = sequelize.define('Reply', {
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
