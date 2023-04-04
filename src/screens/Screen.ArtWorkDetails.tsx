import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import ArtWorkDetails from '../features/artWork/ArtWorkDetails'
import { getArtWorkRequest } from '../features/artWork/request'
import { useTheme } from '../features/themed/hooks'
import { noop } from '../lib/helpers'
import AppHeader from '../navigation/elements/AppHeader'
import { transparentThemedHeaderStyles } from '../navigation/elements/styles'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const ArtWorkDetailsScreen = ({
  route,
  navigation,
}: ScreenComponentProps<links.artWorkDetails | links.artWorkDetails>) => {
  const { styles: headerStyles, colors } = useTheme(
    transparentThemedHeaderStyles
  )
  const artWorkId = route.params.item.id

  useEffect(() => {
    navigation.addListener('focus', () => {
      getArtWorkRequest(artWorkId).catch(noop)
    })
  }, [navigation, artWorkId])

  return (
    <View style={styles.container}>
      <AppHeader
        style={headerStyles}
        backAvailable
        settingsAvailable
        iconsColor={colors.appHeaderIconDark}
      />
      <ArtWorkDetails />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export default ArtWorkDetailsScreen
