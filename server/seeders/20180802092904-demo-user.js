module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstName: 'Yomi',
      lastName: 'Doe',
      username: 'oyomi',
      email: 'seayomi@gmail.com',
      verified: true,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
