import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { api } from './services/api'

export default function App() {
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
      <StatusBar style="auto" />
      <Text style={styles.textContainer}>
        Refer to the task details in <Text style={styles.highlight}>ASSIGNMENT.md</Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlight: { fontWeight: 'bold' },
  textContainer: { textAlign: 'center', margin: 10 },
})
