module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Follows', [
    {
      followerId: 4,
      followingId: 3,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 4,
      followingId: 5,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 3,
      followingId: 4,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 3,
      followingId: 5,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
  ]),

  down: () => {
  }
};
