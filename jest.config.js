const config = {
  verbose: true,
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};

module.exports = config;
