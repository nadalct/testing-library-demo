import { rest } from 'msw';

// Uncomment once it's needed on the first test for Dogs
// const retrieverBreeds = ['golden', 'labrador'];

export const handlers = [
  rest.get('https://dog.ceo/api/breeds/image/random', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: 'https://dog.ceo/api/img/placeholder.jpg',
      }),
    );
  }),

  rest.get('https://dog.ceo/api/breeds/list/all', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: {
          retriever: ['golden', 'labrador'],
          // retriever: retrieverBreeds, // Delete previous line when uncommenting this one
        },
      }),
    );
  }),

  // Add this one after the second test for Dogs
  rest.get('https://dog.ceo/api/breed/:breed/:type/images/random', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        status: 'success',
        message: 'https://dog-by-breed.jpg',
      }),
    );
  }),
];
