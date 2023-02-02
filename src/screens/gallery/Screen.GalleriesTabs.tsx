import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import GalleryTabBar from '../../features/gallery/GalleryTabBar'
import { GALLERIES } from '../../features/gallery/descriptors'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useScreenLoading } from '../../lib/helpers/native/hook.screenLoad'
import NavigationFilterButton from '../../navigation/elements/NavigationButton.GalleryFilter'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'
import ScreenGallery from './Screen.Gallery'

const Tab = createMaterialTopTabNavigator<ScreensProps>()

const GalleriesTabsScreen = () => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    tabs: tabsThemedStyles,
    gradient: themedPrimaryGradient,
  })
  const isLoaded = useScreenLoading()

  return (
    <View style={screenStyles.container}>
      <AdaptiveGradient colors={styles.gradient}>
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
            <GalleryTabBar {...props} style={styles.tabs} colors={colors} />
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
