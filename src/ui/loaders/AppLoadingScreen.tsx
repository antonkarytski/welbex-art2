import React from 'react'
import { ImageBackground, StyleSheet, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyle } from '../../features/themed/hooks'

const appIconImage = require('../../../assets/images/app_icon.png')

const AppLoadingScreen = () => {
  const styles = useThemedStyle(themedStyles)

  return (
    <View style={styles.container}>
      <ImageBackground
        source={appIconImage}
        style={styles.appIcon}
        resizeMode="cover"
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.screenBackground,
    },
    appIcon: {
      width: 140,
      height: 140,
    },
  })
)

export default AppLoadingScreen
