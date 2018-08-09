
export default (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      foreignKey: 'tagId',
      as: 'tags'
    });
    Article.hasMany(models.Rating, {
      foreignKey: 'ratingId',
      as: 'ratings',
    });
    Article.belongsTo(models.Category, {
      foreignKey: 'categoryId',
      as: 'categories',
    });
  };
  return Article;
};
