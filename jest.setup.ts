import "@testing-library/jest-dom";

// Mock global objects
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Set up environment variables
process.env.NEXT_PUBLIC_API_URL = "http://localhost:3000";
