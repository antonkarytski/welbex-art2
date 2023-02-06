import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GALLERIES } from '../../features/gallery/descriptors'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useScreenLoading } from '../../lib/helpers/native/hook.screenLoad'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import NavigationFilterButton from '../../navigation/elements/NavigationButton.GalleryFilter'
import SettingsNavigationButton from '../../navigation/elements/NavigationButton.Settings'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { useText } from '../../translations/hook'
import TabMenu from '../../ui/tabMenu/TabMenu'
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
      <GradientScreenHeader
        title={text.gallery}
        headerLeft={
          <NavigationFilterButton iconColor={colors.appHeaderIconLight} />
        }
        style={{ line: { backgroundColor: 'transparent' } }}
        headerRight={
          <SettingsNavigationButton iconColor={colors.appHeaderIconLight} />
        }
        gradient={{ colors: styles.gradient }}
      />
      {isLoaded ? (
        <Tab.Navigator
          style={styles.tabs.container}
          sceneContainerStyle={styles.tabs.sceneContainer}
          tabBar={(props) => (
            <TabMenu
              routes={Object.values(props.descriptors).map(
                ({ route, options }) => ({
                  key: route.key,
                  title: options.title,
                })
              )}
              style={styles.tabs}
              activeTab={props.state.index}
              {...props}
            />
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
    container: {
      width: 'auto',
    },
    sceneContainer: {
      backgroundColor: colors.screenBackground,
    },
    label: {
      color: colors.textLightGrey,
    },
    labelActive: {
      color: colors.text,
    },
    line: {
      backgroundColor: colors.tabsLine,
    },
    lineActive: {
      backgroundColor: colors.tabsSelectedTint,
    },
  })
)

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
