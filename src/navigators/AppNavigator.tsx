import React from 'react'
import { useColorScheme } from 'react-native'
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack'
import * as Screens from '../screens'

export type AppStackParamList = {
  Welcome: undefined
  Search: undefined
  CityWeather: { lat?: number; lon?: number }
}

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>

const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, navigationBarColor: '#fff' }} initialRouteName={'Welcome'}>
      <>
        <Stack.Screen name='Welcome' component={Screens.WelcomeScreen} />
        <Stack.Screen name='Search' component={Screens.SearchScreen} />
        <Stack.Screen name='CityWeather' component={Screens.CityWeatherScreen} />
      </>
    </Stack.Navigator>
  )
}

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} {...props}>
      <AppStack />
    </NavigationContainer>
  )
}
