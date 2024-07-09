module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          '@config': ['./app/config'],
          '@config/*': ['./app/config/*'],
          '@components': ['./app/components'],
          '@components/*': ['./app/components/*'],
          '@assets': ['./app/assets'],
          '@assets/*': ['./app/assets/*'],
          '@helpers': ['./app/helpers'],
          '@helpers/*': ['./app/helpers/*'],
          '@store': ['./app/store'],
          '@store/*': ['./app/store/*'],
          '@screens': ['./app/screens'],
          '@screens/*': ['./app/screens/*'],
          '@navigation': ['./app/navigation'],
          '@navigation/*': ['./app/navigation/*'],
          '@language/': ['./app/lang/'],
          '@language/*': ['./app/lang/*'],
          '@app': ['./app'],
          '@app/*': ['./app/*'],
        },
      },
    ],
  ],
};
