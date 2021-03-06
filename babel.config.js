module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@assets': './src/assets',
          '@common': './src/components/common',
          '@constants': './src/constants',
          '@customtypes': './src/types',
          '@routes': './src/routes',
          '@screens': './src/components/screens',
          '@store': './src/redux',
          '@theme': './src/constants/theme',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
