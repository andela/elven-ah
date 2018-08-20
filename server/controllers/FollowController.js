import models from '../models';

const { Follow, User } = models;
/**
 * This class contains all the methods responsible for creating and querying
 * user follwer and followee on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class ArticleController {
  /**
   * Create a user follow and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} a user follower was created.
   */
  static createAuthorsFollower(req, res) {
    const { id: userId } = req.user;
    const authorsId = parseInt(req.params.id, 10);
    User.findById(authorsId)
      .then((author) => {
        if (authorsId === userId) {
          return res.status(401).json({
            status: 'fail',
            message: 'You can not follow yourself',
          });
        }
        if (!author) {
          return res.status(404).json({
            status: 'fail',
            message: 'The author You have selected does not exist'
          });
        }
        Follow.findOrCreate({
          where: {
            followingId: authorsId,
            followerId: userId
          },
          defaults: {
            followerId: userId,
            followingId: authorsId,
          },
        }).spread((user, created) => {
          if (!created) {
            return res.status(409).json({
              status: 'fail',
              errors: 'user already exist',
            });
          }
          return res.status(201).json({
            status: 'success',
            message: 'following user',
          });
        });
      })
      .catch(() => res.status(400).json({
        sucess: 'fail',
        message: 'There happen to be an error in the server, please holdon'
      }));
  }

  /**
   * Author can get the list of all the users that follows him.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} list of all followers.
   */
  static getAuthorsFollowers(req, res) {
    const { id: userId } = req.user;
    Follow.findAll({
      where: {
        followingId: userId
      },
      attributes: ['followerId'],
      include: [{
        model: User,
        as: 'follower',
        attributes: ['id', 'username', 'firstName', 'lastName', 'image'],
      }]
    })
      .then((follow) => {
        if (follow.length === 0) {
          return res.status(404).json({
            status: 'fail',
            message: 'You are not currenly following any user'
          });
        }
        res.status(200).json({
          status: 'success',
          message: 'You are currently being followed by these user',
          follower: follow,
        });
      })
      .catch(() => res.status(400).json({
        sucess: 'fail',
        message: 'There happen to be an error in the server, please holdon'
      }));
  }

  /**
   * Author can get the list of all the user he is following.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} list of all user author the author follows.
   */
  static getAuthorsFollowee(req, res) {
    const { id: userId } = req.user;
    Follow.findAll({
      where: {
        followerId: userId
      },
      attributes: ['followingId'],
      include: [{
        model: User,
        as: 'following',
        attributes: ['id', 'username', 'firstName', 'lastName', 'image'],
      }]
    })
      .then((follow) => {
        if (follow.length === 0) {
          return res.status(404).json({
            status: 'fail',
            message: 'You currently do not have any follower'
          });
        }
        res.status(200).json({
          status: 'success',
          message: 'You currently follow these author',
          following: follow,
        });
      })
      .catch(() => res.status(400).json({
        sucess: 'fail',
        message: 'There happen to be an error in the server, please holdon'
      }));
  }

  static unfollowAuthor(req, res) {
    const { id: userId } = req.user;
    const authorsId = parseInt(req.params.id, 10);
    Follow.findOne({
      where: {
        followerId: userId,
        followingId: authorsId
      },
    })
      .then((foundFollowee) => {
        if (!foundFollowee) {
          return res.status(404).json({
            status: 'fail',
            message: 'You are not currently following this Author',
          });
        }
        Follow.destroy({
          where: {
            followerId: userId,
            followingId: authorsId
          },
        })
          .then(() => {
            res.status(200).json({
              status: 'success',
              message: `You have successfully unfollowed user with id ${authorsId}`,
            });
          });
      })
      .catch(() => res.status(400).json({
        status: 'fail',
        error: 'Article can not be deleted'
      }));
  }
}
