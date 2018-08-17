module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Comments', [
    {
      articleId: 1,
      userId: 2,
      parentId: null,
      body: 'Awesome Article, bro!!!!',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    }
  ]),

  down: () => {
  }
};
