
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [
    {
      title: 'arts is wonderful',
      body: 'lkjslkdjfkdjflk',
      slug: 'arts-is-wonderful-120794ujhd',
      userId: 1,
      categoryId: 5,
      author: 'unique',
      createdAt: '2018-08-08 18:31:22.324',
      updatedAt: '2018-08-08 18:31:22.324'
    }
  ]),
  down: () => {
  }
};
