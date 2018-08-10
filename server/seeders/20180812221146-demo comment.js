module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Comments', [
    {
      articleSlug: 'Arts-is-wonderful-120794ujhd',
      author: 'unique',
      parentId: null,
      body: 'Awesome Article, bro!!!!',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    }
  ]),

  down: () => {
  }
};
