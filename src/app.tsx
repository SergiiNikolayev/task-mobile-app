import React from 'react'
import { AppNavigator } from './navigators'
import { PaperProvider } from 'react-native-paper'

import { paperTheme } from './theme'
import { StatusBar } from 'expo-status-bar'

export default function App() {
  return (
      <PaperProvider theme={paperTheme}>
        <StatusBar style={'light'} />
        <AppNavigator />
      </PaperProvider>
  )
}
