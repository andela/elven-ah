const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      firstName: 'Unique',
      lastName: 'Clinton',
      username: 'unique',
      password: bcrypt.hashSync('passWord4', 10),
      email: 'testseeder@test.com',
      bio: `John Doe was born in 1977 when he arrived in Los Angeles.
            His previous life in Tennessee,
            Wisconsin & Baltimore was a great & fertile time but
            new music and social changes led him to events that created a life in art.`,
      image: 'http://i.pravatar.cc/150?img=3',
      createdAt: '2018-08-08 18:31:22.324',
      updatedAt: '2018-08-08 18:31:22.324',
      verified: true,
    },
    {
      firstName: 'Bernice',
      lastName: 'Agatha',
      password: bcrypt.hashSync('passWord4', 10),
      username: 'Bernice',
      email: 'testsimi@test.com',
      bio: `John Doe was born in 1977 when he arrived in Los Angeles. 
          His previous life in Tennessee, 
          Wisconsin & Baltimore was a great & fertile time but 
          new music and social changes led him to events that created a life in art.`,
      image: 'http://i.pravatar.cc/150?img=4',
      createdAt: '2018-08-08 18:31:22.324',
      updatedAt: '2018-08-08 18:31:22.324',
      verified: true,
    },
    {
      firstName: 'Yomi',
      lastName: 'Abayomi',
      password: bcrypt.hashSync('passWord4', 10),
      username: 'oyomi',
      email: 'seayomi@gmail.com',
      image: 'http://i.pravatar.cc/150?img=5',
      verified: true,
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      username: 'JohnAwesome',
      firstName: 'John',
      lastName: 'Anthony',
      verified: true,
      image: 'http://i.pravatar.cc/150?img=2',
      email: 'johndoe@mail.com',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      username: 'Sweetheart',
      firstName: 'Sweet',
      lastName: 'Anthonio',
      verified: true,
      image: 'http://i.pravatar.cc/150?img=7',
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
      image: 'http://i.pravatar.cc/150?img=8',
      email: 'andrometal@mail.com',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    },
    {
      username: 'Jane345',
      firstName: 'Jane',
      lastName: 'Dennis',
      verified: false,
      email: 'janedoe@mail.com',
      image: 'http://i.pravatar.cc/150?img=9',
      password: bcrypt.hashSync('passWord4', 10),
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49',
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
