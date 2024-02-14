import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native'
import { AppStackScreenProps } from '../navigators';
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

interface SearchScreenProps extends AppStackScreenProps<'Search'> {}

export const SearchScreen: FC<SearchScreenProps> = function WelcomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text>Text</Text>
        <Text>Text</Text>
      </View>

      <View style={styles.bottomContainer}>
        <Button
          onPress={() => navigation.navigate('Welcome')}
          title="Back"
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
