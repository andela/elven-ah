module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Categories', [
    {
      title: 'Politics',
    },
    {
      title: 'Design',
    },
    {
      title: 'Africa',
    },
    {
      title: 'Technology'
    },
    {
      title: 'Culture'
    },
    {
      title: 'Business'
    },
    {
      title: 'Romance'
    },
    {
      title: 'Health'
    },
    {
      title: 'Style'
    },
    {
      title: 'Travel'
    },
    {
      title: 'DIY'
    },
    {
      title: 'Opinion'
    }
  ]),

  down: () => {
  }
};
