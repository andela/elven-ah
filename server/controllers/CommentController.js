import models from '../models';

const { Comment, User } = models;

/**
 * This class contains all the methods responsible for creating and querying
 * comments on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class CommentController {
  /**
   * Create a comment and return the data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the comment that was created.
   */
  static createComment(req, res) {
    const { username } = req.user;
    const { body } = req.body;
    const parentId = req.query.id === undefined ? null : req.query.id;
    const slug = parentId === null ? req.params.slug : null;
    Comment.create({
      articleSlug: slug,
      author: username,
      parentId,
      body,
    }).then(newComment => res.status(201).json({
      status: 'success',
      message: 'Comment has been created',
      comment: {
        id: newComment.id,
        parentId: newComment.parentId,
        createdAt: new Date(newComment.createdAt).toLocaleString('en-GB', { hour12: true }),
        updatedAt: new Date(newComment.updatedAt).toLocaleString('en-GB', { hour12: true }),
        body: newComment.body,
        article: newComment.articleSlug,
        author: {
          username: newComment.author,
          bio: newComment.author.bio,
          image: newComment.author.image,
          following: 'true',
        },
      },
    })).catch(() => {
      res.status(400).json({
        status: 'fail',
        message: 'Unable to create comment.',
      });
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
        message: 'Unable to get comments',
      });
    });
  }

  /**
   * Get a comment by its id
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} an object containing an array of all comments.
   */
  static getComment(req, res) {
    Comment.findById((req.params.id), {
      include: [
        { model: User, as: 'commenter' },
      ]
    }).then(comment => res.status(200).json({
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
    })).catch(() => {
      res.status(400).json({
        status: 'fail',
        message: 'Unable to get comment.',
      });
    });
  }

  /**
   * Update a comment
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the updated comment.
   */
  static updateComment(req, res) {
    Comment.findById(parseInt(req.params.id, 10))
      .then((comment) => {
        if (!comment) {
          return res.status(404).json({
            status: 'fail',
            message: 'No comment found, please check the id supplied',
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
              data: {
                id: updatedComment.id,
                parentId: updatedComment.parentId,
                createdAt: new Date(updatedComment.createdAt).toLocaleString('en-GB', { hour12: true }),
                updatedAt: new Date(updatedComment.updatedAt).toLocaleString('en-GB', { hour12: true }),
                body: updatedComment.body,
                author: updatedComment.author,
              }
            });
          });
      }).catch(() => res.status(400).json({
        status: 'fail',
        message: 'Unable to update comment',
      }));
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
          return res.status(400).json({
            status: 'fail',
            message: 'No comment found, please check the id supplied',
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
}
