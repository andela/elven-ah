import Auth from '../helpers/copyleaks/Auth';
import Scanner from '../helpers/copyleaks/Scan';

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
  }, {
    hooks: {
      beforeCreate: async (article) => {
        const scanner = new Scanner(Auth.accesstoken);
        const { body } = article.dataValues;
        const processId = await scanner.uploadScan(body);
        const result = await scanner.checkResult(processId);
        console.log(result);
      }
    }
  });
  Article.associate = (models) => {
    Article.belongsTo(models.User, {
      foreignKey: 'userId',
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
  };
  return Article;
};
