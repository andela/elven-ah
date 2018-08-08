
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      title: 'Arts',
    },
    {
      title: 'Media',
    },
    {
      title: 'Religion',
    },
    {
      title: 'Technology'
    },
    {
      title: 'Commerce'
    }
  ]),

  down: () => {
  }
};
