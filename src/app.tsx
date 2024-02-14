import React from 'react'
import { AppNavigator } from './navigators'
import { PaperProvider } from 'react-native-paper'
import { paperTheme } from './theme'

export default function App() {
  return (
    <PaperProvider theme={paperTheme}>
      <AppNavigator />
    </PaperProvider>
  )
}
