import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { paperTheme } from '../theme'

export interface WeatherInfoProps {
  title: string
  value: string | number
}

export function WeatherInfoCard(props: WeatherInfoProps) {
  const { title, value } = props
  return (
    <View style={styles.container}>
      <Text style={styles.title} variant='bodyMedium'>
        {title}
      </Text>
      <Text style={styles.text} variant='headlineSmall'>
        {value}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.4,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: paperTheme.colors.backgroundSecondary,
    margin: 10,
    borderRadius: 20,
    padding: 10,
  },
  countryContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  cityContainer: {
    justifyContent: 'center',
  },
  avatar: {
    backgroundColor: paperTheme.colors.avatarBackground,
  },
  title: {
    color: paperTheme.colors.fontSecondary,
    marginBottom: 5,
  },
  text: {
    color: 'white',
  },
})
