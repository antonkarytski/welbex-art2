import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { setUpGalleryFilterButton } from '../../features/filters/NavigationButton.GalleryFilter'
import { useGalleriesDescriptors } from '../../features/gallery/descriptors'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useScreenLoading } from '../../lib/helpers/native/hook.screenLoad'
import GradientScreenHeader from '../../navigation/elements/GradientScreenHeader'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { themedPrimaryGradient } from '../../styles/gradients'
import { tabMenuThemedStyles } from '../../styles/tabMenu'
import { useText } from '../../translations/hook'
import TabMenu from '../../ui/tabMenu/TabMenu'
import ScreenGallery from './Screen.Gallery'

const Tab = createMaterialTopTabNavigator<ScreensProps>()

const GalleriesTabsScreen = () => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    tabMenu: tabMenuThemedStyles,
    gradient: themedPrimaryGradient,
    common: themedStyles,
  })
  const isLoaded = useScreenLoading()
  const galleriesDescriptors = useGalleriesDescriptors()

  return (
    <View style={styles.common.container}>
      <GradientScreenHeader
        title={text.gallery}
        headerRight={setUpGalleryFilterButton(colors)}
        gradient={{ colors: styles.gradient }}
      />
      {isLoaded ? (
        <Tab.Navigator
          style={styles.common.container}
          sceneContainerStyle={styles.common.sceneContainer}
          tabBar={({ descriptors, state, ...props }) => (
            <TabMenu
              routes={Object.values(descriptors).map(({ route, options }) => ({
                key: route.key,
                title: options.title,
              }))}
              style={styles.tabMenu}
              activeTab={state.index}
              {...props}
            />
          )}
          initialRouteName={links.galleryBest}
        >
          {galleriesDescriptors.map(({ title, type, link }) => {
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

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    sceneContainer: {
      backgroundColor: colors.screenBackground,
    },
  })
)

export default GalleriesTabsScreen
