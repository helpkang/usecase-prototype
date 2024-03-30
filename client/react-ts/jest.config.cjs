
module.exports = {
  verbose: true,
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  roots: ["<rootDir>/src"],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  coverageDirectory: "<rootDir>/coverage",
  resetMocks: false,
  setupFiles: [],
  testEnvironment: "jsdom",
};
