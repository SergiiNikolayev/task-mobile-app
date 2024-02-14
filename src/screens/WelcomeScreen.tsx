import React, { FC, useEffect, useState } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import { AppStackScreenProps } from '../navigators';
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IconButton, MD3Colors, Text } from 'react-native-paper'
import { api } from '../services/api'
import { paperTheme } from '../theme'

const welcomeLogo = require('../assets/partly-cloudy-daytime.png');
interface WelcomeScreenProps extends AppStackScreenProps<'Welcome'> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [city, setCity] = useState('London')

  const fetchEpisodes = async () => {
    const geo = await api.getCityGeolocation(city)
    console.log('debug-geo ==>', geo)
    if (geo.kind === 'ok') {
      // const weather = await api.getCityWeather(geo.lat, geo.lon)
      // console.log('debug-weather', weather)
    }
  }

  useEffect(() => {
    fetchEpisodes()
  }, [])

  const navigateToSearchScreen = () => navigation.navigate('Search')

  return (
    <View style={styles.container}>
      <Image style={styles.welcomeLogo} source={welcomeLogo} resizeMode="contain" />

      <View style={styles.textContainer}>
        <Text style={styles.title} variant="displayMedium">Breeze</Text>
        <Text style={styles.description} variant="headlineMedium">Weather App</Text>
      </View>

      <View style={styles.buttonContainer}>
        <IconButton
          icon="arrow-right"
          iconColor={MD3Colors.neutral100}
          containerColor={paperTheme.colors.icon}
          size={30}
          onPress={navigateToSearchScreen}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: paperTheme.colors.background,
    justifyContent: 'space-around',
  },
  welcomeLogo: {
    marginTop: Dimensions.get('window').height * 0.15,
    height: 150,
    width: '100%',
  },
  title: {
    color: paperTheme.colors.fontPrimary,
    marginBottom: 20,
  },
  description: {
    color: paperTheme.colors.fontSecondary,
  },
  textContainer: {
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
})

