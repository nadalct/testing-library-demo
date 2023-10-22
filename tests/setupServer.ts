import { setupServer } from "msw/node";
import { handlers as dogHandlers } from "../src/pages/Dogs/__tests__/mocks/handlers";

export const server = setupServer(...dogHandlers);
