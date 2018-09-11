module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Follows', [
    {
      followerId: 1,
      followingId: 2,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 1,
      followingId: 3,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 1,
      followingId: 4,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 2,
      followingId: 1,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 3,
      followingId: 1,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 4,
      followingId: 1,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      followerId: 5,
      followingId: 1,
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
  ]),

  down: () => {
  }
};
