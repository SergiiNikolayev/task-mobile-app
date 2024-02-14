import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const paperTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0F7EFE',
    background: '#0A1017',
    myOwnColor: '#BADA55',
  },
};
