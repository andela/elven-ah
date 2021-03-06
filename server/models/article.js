export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {});
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    Article.hasMany(models.Comment, {
      foreignKey: 'articleId',
      as: 'comments',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Article.belongsToMany(models.Tag, {
      through: 'ArticleTags',
      as: 'tags',
      foreignKey: 'articleId',
    });
    Article.hasMany(models.Rating, {
      foreignKey: 'articleId',
      as: 'ratings',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'categories'
    });
    Article.hasMany(models.ArticleSubscription, {
      foreignKey: 'articleId',
      as: 'articlesubscriptions',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Article;
};
