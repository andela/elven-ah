import models from '../../models';
import NotificationController from './NotificationController';

const { Follow, User } = models;
/**
 * This class contains all the methods responsible for creating and querying
 * user follwer and followee on the app
 * It is made up static methods which can be called from anywhere in the app.
 */
export default class FollowController {
  /**
   * Create a user follow and return the Data.
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} a user follower was created.
   */
  static async createAuthorsFollower(req, res) {
    const { id: userId } = req.user;
    const authorsId = parseInt(req.params.id, 10);
    if (authorsId === userId) {
      return res.status(400).json({
        status: 'error',
        message: 'You cannot follow yourself',
      });
    }
    const author = await User.findById(authorsId);
    if (!author) {
      return res.status(404).json({
        status: 'error',
        message: 'The author You have selected does not exist'
      });
    }
    const [follow, created] = await Follow.findOrCreate({
      where: {
        followingId: authorsId,
        followerId: userId
      },
      defaults: {
        followerId: userId,
        followingId: authorsId,
      },
    });
    if (!created) {
      return res.status(409).json({
        status: 'error',
        message: `You are already following ${author.firstName}`,
      });
    }
    const channel = `user-${author.username}`;
    const notificationInfo = {
      userId,
      resourceId: follow.id,
      username: author.username,
    };
    await NotificationController.subscribe(channel, userId);
    res.status(201).json({
      status: 'success',
      message: `You have started following ${author.firstName}`,
    });
    return NotificationController.notifyAuthor('followed', notificationInfo);
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
      .then((followers) => {
        if (followers.length === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'You currently do not have any follower'
          });
        }
        res.status(200).json({
          status: 'success',
          message: 'You are currently being followed by these users',
          data: followers
        });
      });
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
      .then((following) => {
        if (following.length === 0) {
          return res.status(404).json({
            status: 'error',
            message: 'You are not currently following any author'
          });
        }
        res.status(200).json({
          status: 'success',
          message: 'You currently follow these authors',
          data: following,
        });
      });
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
            status: 'error',
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
      });
  }
}
