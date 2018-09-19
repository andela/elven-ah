
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Ratings', [
    {
      userId: 1,
      articleId: 2,
      value: 2,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      articleId: 1,
      value: 4,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      articleId: 3,
      value: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      articleId: 1,
      value: 4,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      articleId: 1,
      value: 5,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      articleId: 2,
      value: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 4,
      articleId: 2,
      value: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 5,
      articleId: 2,
      value: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 6,
      articleId: 2,
      value: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 3,
      articleId: 2,
      value: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Ratings', null, {})
};
