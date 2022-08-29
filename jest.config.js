
module.exports = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'js', 'jsx', 'tsx', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': require.resolve('vue-jest'),
    '^.+\\.tsx?$': require.resolve('ts-jest'),
    '^.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
    require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': require.resolve('babel-jest'),
  },
  testMatch: ['**/tests/unit/**/*.spec.ts'],
  transformIgnorePatterns: ['/node_modules/'],
  snapshotSerializers: ['jest-serializer-vue'],
  testURL: 'http://localhost/',
}