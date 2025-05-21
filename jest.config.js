module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^gatsby-page-utils/(.*)$': 'gatsby-page-utils/dist/$1', // Workaround for Gatsby v2
    '^gatsby-core-utils/(.*)$': 'gatsby-core-utils/dist/$1', // Workaround for Gatsby v2
    '^gatsby-plugin-utils/(.*)$': ['gatsby-plugin-utils/dist/$1', 'gatsby-plugin-utils/$1'] // Workaround for Gatsby v2
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testPathIgnorePatterns: ['node_modules/', '\\.cache/', '<rootDir>.*/public'],
  globals: {
    __PATH_PREFIX__: '',
  },
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
};
