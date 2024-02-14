import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { paperTheme } from '../theme'
import { Avatar, Text } from 'react-native-paper'

export interface CityCardProps {
  cityName?: string
  country?: string
  state?: string
  icon?: string
  onPress?: () => void
}

export function CityCard(props: CityCardProps) {
  const { cityName, country, state, onPress } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.countryContainer}>
        <Avatar.Text style={styles.avatar} size={40} label={country} />
      </View>
      <View style={styles.cityContainer}>
        <Text style={styles.text} variant='headlineSmall'>
          {cityName}
        </Text>
        <Text style={styles.text} variant='bodySmall'>
          {state}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: paperTheme.colors.backgroundSecondary,
    marginBottom: 20,
    borderRadius: 20,
    flexDirection: 'row',
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
  text: {
    color: 'white',
  },
})
