export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: 'Must be a valid email address',
        },
      },
      unique: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    facebookId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitterId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subscriptionDueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Article, {
      foreignKey: 'userId',
      as: 'articles',
    });
    User.hasMany(models.Comment, {
      foreignKey: 'userId',
      as: 'comments',
    });
    User.hasMany(models.Rating, {
      foreignKey: 'userId',
      as: 'ratings',
    });
    User.hasMany(models.Follow, {
      foreignKey: 'followingId',
      as: 'following',
      onDelete: 'cascade'
    });
    User.hasMany(models.Follow, {
      foreignKey: 'followerId',
      as: 'follower',
      onDelete: 'cascade'
    });
    User.hasMany(models.Subscription, {
      foreignKey: 'userId',
      as: 'subscriptions',
    });

    User.belongsToMany(models.User, {
      through: models.Follow,
      foreignKey: 'followerId',
      as: 'followers',
    });
    User.belongsToMany(models.User, {
      through: models.Follow,
      foreignKey: 'followingId',
      as: 'followings',
    });
    User.hasMany(models.ArticleSubscription, {
      foreignKey: 'userId',
      as: 'articlesubscriptions',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
