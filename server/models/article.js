
export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    titleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.BLOB,
      allowNull: true
    },
  });
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Article.hasMany(models.Comment, {
      foreignKey: 'commentId',
      as: 'comments'
    });
    Article.hasMany(models.Tag, {
      foreignKey: 'TagId',
      as: 'tags'
    });
    Article.hasMany(models.Rating, {
      foreignKey: 'RatingId',
      as: 'ratings',
    });
  };
  return Article;
};
