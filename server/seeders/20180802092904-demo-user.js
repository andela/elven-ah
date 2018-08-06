module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstName: 'Yomi',
      lastName: 'Doe',
      username: 'oyomi',
      email: 'seayomi@gmail.com',
      verified: true,
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
