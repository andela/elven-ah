module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Comments', [
    {
      articleId: 3,
      userId: 2,
      parentId: null,
      body: 'Comment Awesome Article, bro!!!!',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 3,
      userId: 6,
      parentId: 1,
      body: 'Reply Useful comment for the time being',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 3,
      userId: 4,
      parentId: 1,
      body: 'Reply Awesome Article, bro!!!!',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 3,
      userId: 2,
      parentId: null,
      body: 'Like all parents, my parents wanted me to be good. But growing up in a lower-middle-class household in an old neighbourhood in Lucknow, India, it was hard to justify being good: our leaders were corrupt; our cricket team wasn’t winning much; my good parents had to toil every day while scumbags did well; and in day-to-day interactions the seemingly successful people were rude, dishonest, and greedy. It was hard growing up believing: be good and you’ll win.',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 3,
      userId: 6,
      parentId: 1,
      body: 'Reply Useful comment for the time being',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 3,
      userId: 4,
      parentId: 1,
      body: 'Reply Awesome Article, bro!!!!',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 2,
      userId: 2,
      parentId: null,
      body: 'There was one person, though, who was good and also the champion of the world: Bret “The Hitman” Hart.',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 1,
      userId: 2,
      parentId: null,
      body: 'Awesome Article, bro!!!!',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    },
    {
      articleId: 1,
      userId: 4,
      parentId: null,
      body: 'Awesome Article, bro!!!! There was one person, though, who was good and also the champion of the world: Bret “The Hitman” Hart.',
      createdAt: '2018-08-10 18:31:22.324',
      updatedAt: '2018-08-10 18:31:22.324'
    }
  ]),

  down: () => {
  }
};
