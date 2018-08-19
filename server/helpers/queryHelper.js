import models from '../models';

const {
  User, Rating, Tag, Article, Subscription, Channel, Notification
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
      { model: Rating, as: 'ratings', attributes: ['id', 'userId', 'value', 'createdAt', 'updatedAt'] },
      { model: Tag, as: 'tags', attributes: ['id', 'articleId', 'title', 'createdAt', 'updatedAt'] },
    ],
  },
  singleArticle: {
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: ['id', 'slug', 'userId', 'categoryId', 'title', 'body', 'imageUrl', 'createdAt', 'updatedAt'],
    include: [
      { model: User, attributes: ['username', 'firstName', 'lastName', 'bio', 'image'] },
      {
        model: Rating,
        as: 'ratings',
        attributes: ['id', 'userId', 'value', 'createdAt', 'updatedAt'],
        include: [{ model: User, as: 'rater', attributes: ['username', 'firstName', 'lastName', 'bio', 'image'] }],
      },
      { model: Tag, as: 'tags', attributes: ['id', 'articleId', 'title', 'createdAt', 'updatedAt'] },
    ],
  },
  allTags: {
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: ['id', 'title', 'articleId', 'createdAt', 'updatedAt'],
    include: [
      { model: Article, as: 'articles', attributes: ['id', 'slug', 'userId', 'categoryId', 'title', 'body', 'imageUrl', 'createdAt', 'updatedAt'] },
    ],
  },
  userProfile: {
    attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'bio', 'image'],
    include: [
      {
        model: Subscription,
        as: 'subscriptions',
        attributes: ['channelId', 'createdAt'],
        include: [{
          model: Channel,
          as: 'channel',
          attributes: ['name'],
          include: [{
            model: Notification,
            as: 'notifications',
            attributes: ['id', 'creator', 'channelId', 'articleSlug', 'eventType', 'resourceId', 'read', 'createdAt', 'updatedAt']
          }],
        }],
      }
    ],
  },
};
