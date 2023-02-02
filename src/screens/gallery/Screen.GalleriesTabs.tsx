import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import GalleryTopBar from '../../features/gallery/GalleryTopBar'
import { GALLERIES } from '../../features/gallery/descriptors'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useScreenLoading } from '../../lib/helpers/native/hook.screenLoad'
import NavigationFilterButton from '../../navigation/elements/NavigationButton.GalleryFilter'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { useText } from '../../translations/hook'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import { primaryGradientPreset } from '../../ui/gradients/styles'
import ScreenGallery from './Screen.Gallery'

const Tab = createMaterialTopTabNavigator<ScreensProps>()

const GalleriesTabsScreen = () => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    tabs: tabsThemedStyles,
  })
  const isLoaded = useScreenLoading()
  const gradientColors = primaryGradientPreset(colors)

  return (
    <View style={screenStyles.container}>
      <AdaptiveGradient
        startColor={gradientColors.start}
        endColor={gradientColors.end}
      >
        <ScreenHeader
          title={text.gallery}
          headerLeft={
            <NavigationFilterButton iconColor={colors.appHeaderIconLight} />
          }
          style={{ line: { backgroundColor: 'transparent' } }}
          headerRight={
            <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
          }
        />
      </AdaptiveGradient>
      {isLoaded ? (
        <Tab.Navigator
          style={styles.tabs.container}
          sceneContainerStyle={styles.tabs.sceneContainer}
          tabBar={(props) => (
            <GalleryTopBar {...props} style={styles} colors={colors} />
          )}
          initialRouteName={links.galleryBest}
        >
          {GALLERIES.map(({ title, type, link }) => {
            return (
              <Tab.Screen
                key={link}
                options={{
                  title: title(text),
                }}
                name={link}
                initialParams={{ type }}
                component={ScreenGallery}
              />
            )
          })}
        </Tab.Navigator>
      ) : null}
    </View>
  )
}

export default GalleriesTabsScreen

export const tabsThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    wrapper: {
      paddingHorizontal: 20,
    },
    container: {
      width: 'auto',
    },
    sceneContainer: {
      backgroundColor: colors.screenBackground,
    },
    label: {
      color: colors.textGrey,
    },
    labelActive: {
      color: colors.text,
    },
    tabBar: {
      borderBottomColor: colors.tabsLine,
    },
  })
)

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
