module.exports = {
  root: true,
  extends: ['prettier', '@react-native-community'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        trailingComma: 'es5',
        bracketSpacing: true,
        tabWidth: 2,
        printWidth: 120,
      },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'react-native/no-inline-styles': 'off',
    'react/self-closing-comp': 'off',
    'no-shadow': 'off',
  },
};
