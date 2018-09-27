
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Tags', [
    {
      title: 'Enjoyment',
      articleId: 2,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      title: 'Andela',
      articleId: 1,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      title: 'Social',
      articleId: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      title: 'Awesome',
      articleId: 1,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      title: 'Unique',
      articleId: 1,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      title: 'Lovely',
      articleId: 2,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Tags', null, {})
};
