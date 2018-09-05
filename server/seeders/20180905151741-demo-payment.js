module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Payments', [
    {
      userId: 2,
      transactionReference: 'FLW-MOCK-7c47a1e6a7eecca561c094e902347fd5',
      subscriptionType: 'annual',
      dueDate: '2018-10-10 16:31:22.324',
      createdAt: '2018-09-10 16:31:22.324',
      updatedAt: '2018-09-10 16:31:22.324'
    }
  ]),

  down: () => {
  }
};
