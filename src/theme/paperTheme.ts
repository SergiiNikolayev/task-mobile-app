import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const paperTheme = {
  ...DefaultTheme,
  myOwnProperty: true,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    fontPrimary: '#fff',
    fontSecondary: '#76828C',
    icon: '#0F7EFE',
    primary: '#0A1017',
    background: '#0A1017',
    backgroundSecondary: 'rgba(35,51,77,0.73)',
    myOwnColor: '#BADA55',
    avatarBackground: '#15ABE3',
  },
};
