import models from '../models';
import NotificationController from './NotificationController';

const { Comment, User, Article } = models;

/**
 * This class contains all the methods responsible for creating and querying
 * comments on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class CommentController {
  /**
   * Create a comment, trigger a notification to all users following that article
   * and subscribes the user to get notifications on that article.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the comment that was created.
   */
  static async createComment(req, res) {
    const { id: userId, username } = req.user;
    const { body } = req.body;
    let parentId = req.query.id === undefined ? null : req.query.id;
    const { slug } = req.params;
    const article = await CommentController.getArticleFromSlug(slug);
    if (article === null) {
      return res.status(400).json({
        status: 'fail',
        message: 'Unable to create comment because the article does not exist.',
      });
    }
    const parentComment = await Comment.findById(parentId);
    if (JSON.parse(JSON.stringify(parentComment)) === null) parentId = null;
    const newComment = await Comment.create({
      articleId: article.id,
      userId,
      parentId,
      body,
    });
    const channel = `article-${slug}`;
    CommentController.commentResponse(res, newComment, slug, username);
    const subscription = await NotificationController.subscribe(channel, userId);
    return NotificationController.notifyReaders(channel, 'commented', {
      userId,
      articleSlug: slug,
      channelId: subscription.channel.id,
      resourceId: newComment.id,
    });
  }

  /**
   * Get all comments with one level reply nesting.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} an object containing an array of all comments.
   */
  static getComments(req, res) {
    Comment.findAll({
      include: [
        { model: User, as: 'commenter' },
      ]
    }).then((comments) => {
      const destructuredComments = comments.map(comment => Object.assign(
        {},
        {
          id: comment.id,
          parentId: comment.parentId,
          createdAt: new Date(comment.createdAt).toLocaleString('en-GB', { hour12: true }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('en-GB', { hour12: true }),
          body: comment.body,
          author: {
            username: comment.commenter.username,
            bio: comment.commenter.bio,
            image: comment.commenter.image,
          },
        }
      ));
      const result = CommentController.nestComments(destructuredComments);
      res.status(200).json({
        status: 'success',
        comments: result,
      });
    }).catch(() => {
      res.status(400).json({
        status: 'fail',
        message: 'Unable to get comments.',
      });
    });
  }

  /**
   * Get a comment by its id
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} an object containing an array of all comments.
   */
  static getComment(req, res, next) {
    Comment.findById((req.params.id), {
      include: [
        { model: User, as: 'commenter' },
      ]
    }).then((comment) => {
      if (!comment) {
        res.status(404).json({
          status: 'fail',
          message: 'Unable to get the comment with supplied id.',
        });
      }
      res.status(200).json({
        status: 'success',
        comment: {
          id: comment.id,
          parentId: comment.parentId,
          createdAt: new Date(comment.createdAt).toLocaleString('en-GB', { hour12: true }),
          updatedAt: new Date(comment.updatedAt).toLocaleString('en-GB', { hour12: true }),
          body: comment.body,
          author: {
            username: comment.commenter.username,
            bio: comment.commenter.bio,
            image: comment.commenter.image,
          },
        }
      });
    }).catch(err => next(err));
  }

  /**
   * Update a comment
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the updated comment.
   */
  static updateComment(req, res, next) {
    Comment.findById(parseInt(req.params.id, 10))
      .then((comment) => {
        if (!comment) {
          return res.status(404).json({
            status: 'fail',
            message: 'No comment found, please check the id supplied.',
          });
        }
        Comment.update({
          body: req.body.body,
        }, {
          returning: true,
          where: { id: comment.id },
        })
          .then(([, [updatedComment]]) => {
            res.status(200).json({
              status: 'success',
              comment: {
                id: updatedComment.id,
                parentId: updatedComment.parentId,
                createdAt: new Date(updatedComment.createdAt).toLocaleString('en-GB', { hour12: true }),
                updatedAt: new Date(updatedComment.updatedAt).toLocaleString('en-GB', { hour12: true }),
                body: updatedComment.body,
                author: updatedComment.author,
              }
            });
            const { slug } = req.params;
            return NotificationController.notifyOnUpdate('updated a comment', {
              userId: req.user.id,
              articleSlug: slug,
              resourceId: updatedComment.id,
            });
          }).catch(() => res.status(400).json({
            status: 'fail',
            message: 'Unable to update comment',
          }));
      }).catch(err => next(err));
  }

  /**
   * Delete a comment
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {null}
   */
  static deleteComment(req, res) {
    Comment.findById(parseInt(req.params.id, 10))
      .then((comment) => {
        if (!comment) {
          return res.status(404).json({
            status: 'fail',
            message: 'No comment with the supplied id found.',
          });
        }
        Comment.destroy({ where: { id: comment.id } })
          .then(() => res.status(200).json({
            status: 'success',
            message: 'Comment deleted.'
          }));
      }).catch(() => res.status(400).json({
        status: 'fail',
        message: 'Invalid comment id supplied.',
      }));
  }

  /**
   * One-level nest an array of comments and replies
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {array} an array of nested comments.
   */
  static nestComments(comments) {
    const mainComments = comments.filter(comment => comment.parentId === null);
    const replies = comments.filter(comment => comment.parentId !== null);
    const result = [];
    mainComments.forEach((comment) => {
      comment.replies = replies.filter(reply => reply.parentId === comment.id);
      result.push(comment);
    });
    return result;
  }

  /**
   * Return the article that has the supplied slug
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {promise} the article object found
   */
  static getArticleFromSlug(slug) {
    return new Promise((resolve, reject) => {
      Article.findOne({
        where: { slug },
        attributes: [
          'id', 'title', 'userId', 'slug', 'body',
          'imageUrl', 'categoryId', 'createdAt', 'updatedAt'
        ],
      })
        .then(article => resolve(article))
        .catch(err => reject(err));
    });
  }

  /**
   * Formats and sends the response to the user when a comment is created.
   * @param {object} res the response object
   * @param {object} newComment the created comment
   * @param {string} slug the slug of the article to which the comment belongs
   * @param {string} username the author of the comment
   * @returns {object} the comment that was created.
   */
  static commentResponse(res, newComment, slug, username) {
    return res.status(201).json({
      status: 'success',
      message: 'Comment has been created',
      comment: {
        id: newComment.id,
        parentId: newComment.parentId,
        createdAt: new Date(newComment.createdAt).toLocaleString('en-GB', { hour12: true }),
        updatedAt: new Date(newComment.updatedAt).toLocaleString('en-GB', { hour12: true }),
        body: newComment.body,
        article: slug,
        author: username,
      },
    });
  }
}
