import React from 'react'
import { AppNavigator } from './navigators'
import { PaperProvider } from 'react-native-paper'
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

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
