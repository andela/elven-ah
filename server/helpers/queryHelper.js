import models from '../models';

const {
  User, Rating, Tag,
} = models;

/*
* Holds the query helper object which contains the various query templates
*/
export default {
  allArticles: {
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: ['id', 'slug', 'userId', 'categoryId', 'title', 'body', 'imageUrl', 'createdAt', 'updatedAt'],
    include: [
      { model: User, attributes: ['username', 'firstName', 'lastName', 'bio', 'image'] },
      { model: Tag, as: 'tags', attributes: ['id', 'articleId', 'title', 'createdAt', 'updatedAt'] },
    ],
  },
};
