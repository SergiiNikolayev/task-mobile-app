import React, { FC, useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { AppStackScreenProps } from '../navigators';
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { api } from '../services/api'

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

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Text</Text>
        <Text>Text</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          onPress={() => navigation.navigate('Search')}
          title="Test button"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: '57%',
    justifyContent: 'center',
  },
  bottomContainer: {
    flexShrink: 1,
    flexGrow: 0,
    flexBasis: '43%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'space-around',
  },
})

