

export default (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    creator: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    channelId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleSlug: {
      type: DataTypes.STRING,
      allowNull: true
    },
    eventType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resourceId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  }, {});
  Notification.associate = (models) => {
    Notification.belongsTo(models.Channel, {
      foreignKey: 'channelId',
      as: 'notifications',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Notification;
};
