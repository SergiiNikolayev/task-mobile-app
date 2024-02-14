import React, { FC, useState } from 'react'
import _ from 'lodash'
import { Button, SafeAreaView, StyleSheet, View, ActivityIndicator, FlatList } from 'react-native'
import { Text, TextInput } from 'react-native-paper'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppStackScreenProps } from '../navigators'
import { api } from '../services/api'
import { paperTheme } from '../theme'
import { CityCard } from '../components'

interface SearchScreenProps extends AppStackScreenProps<'Search'> {}

export const SearchScreen: FC<SearchScreenProps> = function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
  const [units, setUnits] = useState('metric')
  const [city, setCity] = useState('')
  const [cityList, setCityList] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchData = async (search: string) => {
    try {
      setLoading(true)
      setError('')
      const geo = await api.getCityGeolocation(search, units)
      console.log('debug-geo ==>', geo)
      if (geo.kind === 'ok') {
        setCityList(geo.data)
        // const weather = await api.getCityWeather(geo.lat, geo.lon)
        // console.log('debug-weather', weather)
        if (!geo.data.length) {
          setError("Apologies, I couldn't locate anything.")
        }
      }
    } catch (e) {
      setError('Something went wrong')
      setLoading(false)
      setCityList(null)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchData = React.useCallback(_.debounce(fetchData, 1500), [])

  const onChangeTextValue = (text: string) => {
    setCity(text)
    debouncedFetchData(text)
  }

  const onCancel = () => {
    setCity('')
    setError('')
    setLoading(false)
    setCityList(null)
  }

  const onCitySelect = (lat: number, lon: number) => {
    console.log(lat, lon)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          value={city}
          style={styles.search}
          textColor={paperTheme.colors.fontPrimary}
          selectionColor={paperTheme.colors.fontPrimary}
          mode='outlined'
          onChangeText={(text) => onChangeTextValue(text)}
          theme={{ roundness: 50 }}
          right={<TextInput.Icon icon='close' size={30} onPress={onCancel} />}
        />

        <View style={styles.cityContainer}>
          {error && (
            <Text style={styles.error} variant='bodyLarge'>
              {error}
            </Text>
          )}
          {loading && <ActivityIndicator size='large' animating={true} color={paperTheme.colors.fontPrimary} />}
          <FlatList
            data={cityList}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CityCard
                onPress={() => onCitySelect(item.lat, item.lon)}
                cityName={item.name}
                country={item.country}
                state={item.state}
              />
            )}
          />
        </View>

        <Button
          onPress={() => navigation.navigate('Welcome')}
          title='Back'
          color='#841584'
          accessibilityLabel='Learn more about this purple button'
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: paperTheme.colors.background,
    justifyContent: 'flex-start',
  },
  content: {
    padding: 20,
  },
  error: {
    paddingHorizontal: 5,
    color: 'red',
  },
  search: {
    backgroundColor: paperTheme.colors.backgroundSecondary,
    color: paperTheme.colors.fontPrimary,
    borderRadius: 120,
  },
  cityContainer: {
    marginTop: 20,
  },
})
