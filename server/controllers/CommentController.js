import models from '../models';

const { Comment } = models;

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
    })).catch((err) => {
      console.error(err);
      res.status(400).json({
        status: 'fail',
        error: 'Unable to create comment.',
      });
    });
  }

  static getComments(req, res) {
    let query;
    if (req.params.commentId) {
      query = Comment.findAll({
        include: [
          { model: models.Comment, as: 'parent', where: { id: req.params.commentId, } },
          { model: models.User },
        ]
      });
    } else {
      query = Comment.findAll({
        include: [
          { model: models.Comment, as: 'child' },
          { model: models.User },
        ]
      });
    }
    return query.then(comments => res.status(200).json({
      status: 'success',
      Comments: comments,
    }))
      .catch((err) => {
        console.error(err);
        res.status(400).json({
          status: 'fail',
          message: 'Unable to get comments',
        });
      });
  }
}
