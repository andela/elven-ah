

export default (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {});
  Subscription.associate = (models) => {
    Subscription.belongsTo(models.Channel, {
      foreignKey: 'channelId',
      as: 'channel',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Subscription.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'subscriptions',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Subscription;
};
