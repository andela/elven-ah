export default (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    transactionReference: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subscriptionType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {});
  Payment.associate = (models) => {
    Payment.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'users',
    });
  };
  return Payment;
};
