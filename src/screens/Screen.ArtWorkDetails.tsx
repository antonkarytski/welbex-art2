import React from 'react'
import { StyleSheet, View } from 'react-native'
import ArtWorkDetails from '../features/artWork/ArtWorkDetails'
import { useTheme } from '../features/themed/hooks'
import AppHeader from '../navigation/elements/AppHeader'
import { transparentThemedHeaderStyles } from '../navigation/elements/styles'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'

const ArtWorkDetailsScreen = ({
  route,
}: ScreenComponentProps<links.artWorkDetails | links.artWorkDetails>) => {
  const { styles: headerStyles, colors } = useTheme(
    transparentThemedHeaderStyles
  )

  return (
    <View style={styles.container}>
      <AppHeader
        style={headerStyles}
        backAvailable
        settingsAvailable
        iconsColor={colors.appHeaderIconDark}
      />
      <ArtWorkDetails drawingId={route.params.item.id} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})

export default ArtWorkDetailsScreen
