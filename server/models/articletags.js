
export default (sequelize, DataTypes) => {
  const ArticleTags = sequelize.define('ArticleTags',
    {
      tagId: {
        type: DataTypes.INTEGER,
        allowNULL: true,
      },
      articleId: {
        type: DataTypes.INTEGER,
        allowNULL: true,
      }
    });
  ArticleTags.associate = (/* models */) => {
    // associations can be defined here
  };
  return ArticleTags;
};
 