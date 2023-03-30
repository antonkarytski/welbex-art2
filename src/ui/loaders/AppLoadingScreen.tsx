import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyle } from '../../features/themed/hooks'
import Gradient from '../gradients/Gradient'

const appIconImage = require('../../../assets/images/app_icon.png')

const AppLoadingScreen = () => {
  const styles = useThemedStyle(themedStyles)

  return (
    <View style={styles.container}>
      <Gradient style={styles.gradient}>
        <ImageBackground
          source={appIconImage}
          style={styles.appIcon}
          resizeMode="cover"
        />
      </Gradient>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      backgroundColor: colors.screenBackgroundAccent,
    },
    gradient: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    appIcon: {
      width: 140,
      height: 140,
    },
  })
)

export default AppLoadingScreen
