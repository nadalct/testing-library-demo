import { enableFetchMocks } from 'jest-fetch-mock';

import '@testing-library/jest-dom';

import { server } from './setupServer';

enableFetchMocks();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
