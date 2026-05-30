export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['./setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.ts',
  },
};