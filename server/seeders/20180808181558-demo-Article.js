
module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Articles', [
    {
      title: 'arts is wonderful',
      body: 'lkjslkdjfkdjflk',
      slug: 'arts-is-wonderful-120794ujhd',
      userId: 1,
      categoryId: 5,
      createdAt: '2018-07-08 18:31:22.324',
      updatedAt: '2018-08-09 18:31:22.324'
    },
    {
      slug: 'the-first-article-by-the-user',
      userId: 1,
      categoryId: 2,
      title: 'The first article by the user',
      body: 'This is great because it updates the database <img src="https://images.unsplash.com/photo-1537970264887-190be0b36591?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f991d8c968e4aafeee7e8e4a44193c5&auto=format&fit=crop&w=2100&q=80" /> with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-the-user',
      userId: 1,
      categoryId: 2,
      title: 'The second article by the user',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns <img src="https://images.unsplash.com/photo-1537941032657-672864703060?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e25dea0cf8dd7808c7bfbdecc6a02a1&auto=format&fit=crop&w=934&q=80" /> the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-first-article-by-another-user',
      userId: 2,
      categoryId: 3,
      title: 'The first article by another user',
      body: 'This is great because it updates the database with the new book title for the matching book id. <img src="https://images.unsplash.com/photo-1537927863396-55452cdd2096?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0514d6e6eff1a74a5439515bb958ecbd&auto=format&fit=crop&w=975&q=80" /> But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-another-user',
      userId: 2,
      categoryId: 2,
      title: 'The second article by another user',
      body: '<img src="https://images.unsplash.com/photo-1537914374312-88a58ed95a82?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e237b83a0dd3e5746e068938f6e49861&auto=format&fit=crop&w=2100&q=80" /> One of the projects I was assigned to involved a drug that was targeted at women. The graphics and general style of the website made it clear that the client wanted to specifically target teenage girls. One of the features of this website was a quiz that asked girls a series of questions and recommended a type of drug based on their answers.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'other-articles-by-other-users',
      userId: 3,
      categoryId: 2,
      title: 'Other articles by other users',
      body: ' <img src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d805214562c44ffd6de6cb7954405ab&auto=format&fit=crop&w=975&q=80" />This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-other-user',
      userId: 3,
      categoryId: 2,
      title: 'The second article by other user',
      body: 'This is great because it updates the database with the new book title for the matching book id. <img src="https://images.unsplash.com/photo-1537946601344-843035066851?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4f977d92f87634b9b9fc1aa0f35dd050&auto=format&fit=crop&w=934&q=80" /> But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF1',
      userId: 1,
      categoryId: 2,
      body: 'As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. <img src="https://images.unsplash.com/photo-1537883927710-61d5d1a2c1e9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0bf498a63b771656f26a8124eeb3e6be&auto=format&fit=crop&w=1868&q=80" /> I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF2',
      userId: 1,
      categoryId: 1,
      body: ' <img src="https://images.unsplash.com/photo-1537964769190-561c0c37b043?ixlib=rb-0.3.5&s=5c6fad276a1cbb344dd7efb6d0688845&auto=format&fit=crop&w=934&q=80" /> As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF3',
      userId: 1,
      categoryId: 1,
      body: 'As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. <img src="https://images.unsplash.com/photo-1537954406021-d821481dc0d9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0eb0e27031c32c088953a961c4e5d816&auto=format&fit=crop&w=1000&q=80" /> I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF4',
      userId: 1,
      categoryId: 1,
      body: '<img src="https://images.unsplash.com/photo-1537891115166-4affb371bbd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12e8833208e9f57f3421fad30f9af988&auto=format&fit=crop&w=2100&q=80" /> As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'arts is wonderful',
      body: 'lkjslkdjfkdjflk',
      slug: 'arts-is-wonderful-120794ujhd',
      userId: 1,
      categoryId: 5,
      createdAt: '2018-07-08 18:31:22.324',
      updatedAt: '2018-08-09 18:31:22.324'
    },
    {
      slug: 'the-first-article-by-the-user',
      userId: 1,
      categoryId: 2,
      title: 'The first article by the user',
      body: 'This is great because it updates the database <img src="https://images.unsplash.com/photo-1537970264887-190be0b36591?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f991d8c968e4aafeee7e8e4a44193c5&auto=format&fit=crop&w=2100&q=80" /> with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-the-user',
      userId: 1,
      categoryId: 2,
      title: 'The second article by the user',
      body: 'This is great because it updates the database with the new book title for the matching book id. But it returns <img src="https://images.unsplash.com/photo-1537941032657-672864703060?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4e25dea0cf8dd7808c7bfbdecc6a02a1&auto=format&fit=crop&w=934&q=80" /> the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-first-article-by-another-user',
      userId: 2,
      categoryId: 3,
      title: 'The first article by another user',
      body: 'This is great because it updates the database with the new book title for the matching book id. <img src="https://images.unsplash.com/photo-1537927863396-55452cdd2096?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0514d6e6eff1a74a5439515bb958ecbd&auto=format&fit=crop&w=975&q=80" /> But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-another-user',
      userId: 2,
      categoryId: 2,
      title: 'The second article by another user',
      body: '<img src="https://images.unsplash.com/photo-1537914374312-88a58ed95a82?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e237b83a0dd3e5746e068938f6e49861&auto=format&fit=crop&w=2100&q=80" /> One of the projects I was assigned to involved a drug that was targeted at women. The graphics and general style of the website made it clear that the client wanted to specifically target teenage girls. One of the features of this website was a quiz that asked girls a series of questions and recommended a type of drug based on their answers.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'other-articles-by-other-users',
      userId: 3,
      categoryId: 2,
      title: 'Other articles by other users',
      body: ' <img src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4d805214562c44ffd6de6cb7954405ab&auto=format&fit=crop&w=975&q=80" />This is great because it updates the database with the new book title for the matching book id. But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      slug: 'the-second-article-by-other-user',
      userId: 3,
      categoryId: 2,
      title: 'The second article by other user',
      body: 'This is great because it updates the database with the new book title for the matching book id. <img src="https://images.unsplash.com/photo-1537946601344-843035066851?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4f977d92f87634b9b9fc1aa0f35dd050&auto=format&fit=crop&w=934&q=80" /> But it returns the number of rows updated. This is rarely useful on the front-end. More likely we would want to do something with the updated book on the front-end. Of course, we can then query the database in a .then and get that books information, but there has to be a better way! And there is.',
      createdAt: '2018-08-01 21:54:49',
      updatedAt: '2018-08-04 21:54:49'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF1',
      userId: 1,
      categoryId: 2,
      body: 'As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. <img src="https://images.unsplash.com/photo-1537883927710-61d5d1a2c1e9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0bf498a63b771656f26a8124eeb3e6be&auto=format&fit=crop&w=1868&q=80" /> I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF2',
      userId: 1,
      categoryId: 1,
      body: ' <img src="https://images.unsplash.com/photo-1537964769190-561c0c37b043?ixlib=rb-0.3.5&s=5c6fad276a1cbb344dd7efb6d0688845&auto=format&fit=crop&w=934&q=80" /> As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF3',
      userId: 1,
      categoryId: 1,
      body: 'As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. <img src="https://images.unsplash.com/photo-1537954406021-d821481dc0d9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0eb0e27031c32c088953a961c4e5d816&auto=format&fit=crop&w=1000&q=80" /> I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
    {
      title: 'Unmissable steps before, during, and after user research',
      slug: 'unmissable-steps-before-74U33U38N3IHF4',
      userId: 1,
      categoryId: 1,
      body: '<img src="https://images.unsplash.com/photo-1537891115166-4affb371bbd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=12e8833208e9f57f3421fad30f9af988&auto=format&fit=crop&w=2100&q=80" /> As a UX designer, I’m expected to run research studies to mine meaningful insights for my products. I often conduct usability studies to get a pulse of what users think, need or expect from a new product. I was fortunate to work on consumer-facing as well as enterprise products, as a result of which, I gained a diverse experience relevant to conducting user studies in industrial settings. While the commercial products gave us the liberty to find and interview users in person, the enterprise products on the other hand make it difficult to find or access the right users, resulting in remote usability studies.',
      imageUrl: 'https://cloudinary/ah/images/miss.jpg',
      createdAt: 'NOW()',
      updatedAt: 'NOW()'
    },
  ]),
  down: () => {
  }
};
