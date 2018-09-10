const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstName: 'John',
      lastName: 'Doe',
      username: 'unique',
      email: 'testseeder@test.com',
      bio: `John Doe was born in 1977 when he arrived in Los Angeles. 
          His previous life in Tennessee, 
          Wisconsin & Baltimore was a great & fertile time but 
          new music and social changes led him to events that created a life in art.`,
      image: 'https://www.image.com/example/image/john',
      createdAt: '2018-08-08 18:31:22.324',
      updatedAt: '2018-08-08 18:31:22.324',
      verified: true,
    },
    {
      firstName: 'simi',
      lastName: 'Doe',
      username: 'simi',
      email: 'testsimi@test.com',
      bio: `John Doe was born in 1977 when he arrived in Los Angeles. 
          His previous life in Tennessee, 
          Wisconsin & Baltimore was a great & fertile time but 
          new music and social changes led him to events that created a life in art.`,
      image: 'https://www.image.com/example/image/john',
      createdAt: '2018-08-08 18:31:22.324',
      updatedAt: '2018-08-08 18:31:22.324',
      verified: true,
    },
    {
      firstName: 'Yomi',
      lastName: 'Doe',
      username: 'oyomi',
      email: 'seayomi@gmail.com',
      verified: true,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
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
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
