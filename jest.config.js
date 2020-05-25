module.exports = {
  testEnvironment: "node",
  verbose: true,
  // registers babel.config.js with jest
  transform: {
    "^.+\\.js$": "babel-jest",
  },
  transformIgnorePatterns: []
}
