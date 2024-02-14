import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { AppStackScreenProps } from '../navigators';
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { IconButton, MD3Colors } from 'react-native-paper'
import { api } from '../services/api'
import { paperTheme } from '../theme'

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
      <View style={styles.topContainer}>
        <Text>Text</Text>
        <Text>Text</Text>
      </View>

      <View style={styles.bottomContainer}>
        <IconButton
          icon="arrow-right"
          iconColor={MD3Colors.neutral100}
          containerColor={paperTheme.colors.primary}
          size={50}
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
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '57%',
    justifyContent: 'center',
  },
  bottomContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: '43%',
  },
})

