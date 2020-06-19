const { withEnzyme } = require('jest-expo-enzyme');

module.exports = {
  projects: [
    // Skipping Node because we want to test DOM presets only
    withEnzyme(require('jest-expo/ios/jest-preset')),
    withEnzyme(require('jest-expo/android/jest-preset')),
    // The Enzyme support added to web is different from that added to native, which `withEnzyme` handles
    // Luckily you won't have to do anything special because it reads the platform from
    // `haste.defaultPlatform` of the provided Jest config
    withEnzyme(require('jest-expo/web/jest-preset')),
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|@sentry/.*)"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.setup.js",
    "!**/web-build/**",
  ]
}
