import models from '../models';
import queryHelper from '../helpers/queryHelper';

const { User, Tag, Article } = models;

/**
 * This class handles user search operations.
 */
class SearchController {
  /**
   * Re-sends a verification email to the user
   * @param {object} req the request object
   * @param {object} res the response object
   * @returns {object} the article, tag, users arrays of objects.
   */
  static async searchProcess(req, res, next) {
    const keyword = req.query.q;
    if (keyword === undefined) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please enter a search keyword'
      });
    }
    if (keyword === '' || keyword == null) {
      return res.status(400).json({
        status: 'fail',
        message: 'Please enter a search keyword'
      });
    }
    try {
      const userSearch = await User.findAll({
        where: {
          $or: {
            username: {
              $like: `%${keyword}%`
            },
            firstName: {
              $like: `%${keyword}%`
            },
            lastName: {
              $like: `%${keyword}%`
            },
            email: {
              $like: `%${keyword}%`
            },
          },
        },
        order: [
          ['username', 'DESC']
        ],
      });

      const articleSearch = await Article.findAll(Object.assign({}, queryHelper.allArticles,
        {
          where: {
            $or: {
              title: {
                $like: `%${keyword}%`
              },
              body: {
                $like: `%${keyword}%`
              },
            }
          }
        }));

      const tagSearch = await Tag.findAll(Object.assign({}, queryHelper.allTags,
        {
          where: {
            $or: {
              title: {
                $like: `%${keyword}%`
              },
            }
          }
        }));

      return res.status(201).json({
        status: 'success',
        result: {
          userSearch,
          articleSearch,
          tagSearch,
        }
      });
    } catch (err) { next(err); }
  }
}

export default SearchController;
