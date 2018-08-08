
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [
    {
      title: 'arts is wonderful',
      body: 'lkjslkdjfkdjflk',
      slug: 'arts-is-wonderful-120794ujhd',
      userId: 1,
      categoryId: 5,
      createdAt: '2018-08-08 18:31:22.324',
      updatedAt: '2018-08-08 18:31:22.324'
    },
    {
      slug: 'the-first-article-by-the-user',
      userId: 1,
      categoryId: 2,
      title: 'The first article by the user',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-the-user',
      userId: 1,
      categoryId: 2,
      title: 'The second article by the user',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-first-article-by-another-user',
      userId: 2,
      categoryId: 3,
      title: 'The first article by another user',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-another-user',
      userId: 2,
      categoryId: 2,
      title: 'The second article by another user',
      body: 'One of the projects I was assigned to involved a drug that was targeted at women. The graphics and general style of the website made it clear that the client wanted to specifically target teenage girls. One of the features of this website was a quiz that asked girls a series of questions and recommended a type of drug based on their answers.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'other-articles-by-other-users',
      userId: 3,
      categoryId: 2,
      title: 'Other articles by other users',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-other-user',
      userId: 3,
      categoryId: 2,
      title: 'The second article by other user',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
  ]),
  down: () => {
  }
};
