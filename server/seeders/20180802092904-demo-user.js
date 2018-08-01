'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    firstName: 'Yomi',
    lastName: 'Doe',
    username: 'oyomi',
    email: 'seayomi@gmail.com',
    verified: true,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
