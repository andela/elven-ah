
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    followingId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  Follow.associate = (models) => {
    Follow.belongsTo(models.User, {
      as: 'follower',
      foreignKey: 'followerId'
    });
    Follow.belongsTo(models.User, {
      as: 'following',
      foreignKey: 'followingId'
    });
  };
  return Follow;
};
