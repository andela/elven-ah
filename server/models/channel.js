

export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  Channel.associate = (models) => {
    Channel.hasMany(models.Subscription, {
      foreignKey: 'channelId',
      as: 'subscriptions',
    });
    Channel.hasMany(models.Notification, {
      foreignKey: 'channelId',
      as: 'notifications',
    });
  };
  return Channel;
};
