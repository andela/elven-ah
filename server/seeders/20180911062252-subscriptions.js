
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Subscriptions', [
    {
      userId: 1,
      channelId: 1,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 2,
      channelId: 2,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 3,
      channelId: 3,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 4,
      channelId: 4,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 5,
      channelId: 5,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 6,
      channelId: 6,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 7,
      channelId: 7,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 8,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 9,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 10,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 2,
      channelId: 11,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 2,
      channelId: 12,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 3,
      channelId: 13,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 3,
      channelId: 14,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 15,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 16,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 17,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      userId: 1,
      channelId: 18,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Subscriptions', null, {})
};
