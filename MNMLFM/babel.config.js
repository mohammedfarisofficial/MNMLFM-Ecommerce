module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env', // or any other name you prefer
        path: '.env', // path to your .env file
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
    // 'react-native-reanimated/plugin', // Add the Reanimated plugin
  ],
};
