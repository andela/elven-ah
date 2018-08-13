const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      username: 'JohnAwesome',
      firstName: 'John',
      lastName: 'Doe',
      verified: true,
      email: 'johndoe@mail.com',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      username: 'Sweetheart',
      firstName: 'Sweet',
      lastName: 'Heart',
      verified: true,
      email: 'sweetie@mail.com',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      username: 'Hollyfield',
      firstName: 'Holly',
      lastName: 'Andromedia',
      verified: false,
      email: 'andrometal@mail.com',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      username: 'Jane345',
      firstName: 'John',
      lastName: 'Doe',
      verified: false,
      email: 'janedoe@mail.com',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    }], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
