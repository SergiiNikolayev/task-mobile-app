import React, { FC, useEffect, useMemo, useState } from 'react'
import { SafeAreaView, StyleSheet, View, ActivityIndicator, Image, ScrollView } from 'react-native'
import { IconButton, MD3Colors, Switch, Text } from 'react-native-paper'
import { ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackScreenProps } from '../navigators'
import { api } from '../services/api'
import { paperTheme } from '../theme'
import { WeatherInfoCard } from '../components'
import { convertToTitleCase } from '../utils'

interface CityWeatherScreenProps extends AppStackScreenProps<'Search'> {}

export type CityWeatherParamList = {
  params: { lat: number; lon: number }
}

const degreeTypes = ['feels_like', 'temp', 'temp_max', 'temp_min']

export const CityWeatherScreen: FC<CityWeatherScreenProps> = function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const route = useRoute<RouteProp<CityWeatherParamList, 'params'>>()
  const {
    params: { lat, lon },
  } = route

  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSwitchOn, setIsSwitchOn] = React.useState(true)

  const city = weather?.name
  const iconUrl = `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`
  const description = weather?.weather[0].description
  const temperature = `${Math.round(weather?.main.temp)}°`

  const info = useMemo(() => {
    return (
      weather?.main &&
      Object.entries(weather?.main)?.map(([key, value]) => {
        return (
          <WeatherInfoCard
            key={key}
            title={convertToTitleCase(key)}
            value={`${Math.round(value as number)}${degreeTypes.includes(key) ? '°' : ''}`}
          />
        )
      })
    )
  }, [weather, lat, lon])

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn)

  const fetchWeather = async () => {
    try {
      setLoading(true)
      setError('')
      const weather = await api.getCityWeather(lat, lon, isSwitchOn ? 'metric' : 'imperial')
      if (weather.kind === 'ok') {
        setWeather(weather.data)
      }

      if (weather.kind !== 'ok') {
        setError(weather.message)
      }
    } catch (e) {
      setError('Something went wrong')
      setLoading(false)
      setWeather(null)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: {
        backgroundColor: paperTheme.colors.background,
      },
      headerLeft: () => (
        <IconButton
          icon='chevron-left'
          iconColor={MD3Colors.neutral100}
          style={{ marginLeft: -10 }}
          rippleColor={paperTheme.colors.background}
          size={35}
          onPress={() => navigation.goBack()}
        />
      ),
      headerRight: () => (
        <View style={styles.switchContainer}>
          <Text variant='headlineLarge' style={styles.switchText}>
            F
          </Text>
          <Switch color={paperTheme.colors.icon} value={isSwitchOn} onValueChange={onToggleSwitch} />
          <Text variant='headlineLarge' style={styles.switchText}>
            C
          </Text>
        </View>
      ),
    })
  }, [navigation, isSwitchOn])

  useEffect(() => {
    if (lat && lon) {
      fetchWeather()
    }
  }, [isSwitchOn, lat, lon])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading && <ActivityIndicator size='large' animating={true} color={paperTheme.colors.fontPrimary} />}
        {error && (
          <Text style={styles.error} variant='bodyLarge'>
            {error}
          </Text>
        )}
        <View style={styles.content}>
          <Text style={styles.text} variant='displayMedium'>
            {city}
          </Text>
          <Text style={styles.text} variant='titleMedium'>
            {description}
          </Text>
          <Image style={styles.icon} source={{ uri: iconUrl }} resizeMode='contain' />
          <Text style={styles.text} variant='displayMedium'>
            {temperature}
          </Text>
        </View>
        <View style={styles.itemContainer}>{info}</View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: paperTheme.colors.background,
    justifyContent: 'flex-start',
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
    flexWrap: 'wrap',
    marginTop: 8,
    maxHeight: 300,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  content: {
    alignItems: 'center',
  },
  icon: {
    height: 200,
    width: '100%',
  },
  error: {
    paddingHorizontal: 5,
    color: 'red',
  },
  switchText: {
    color: 'white',
  },
  text: {
    color: 'white',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
})
