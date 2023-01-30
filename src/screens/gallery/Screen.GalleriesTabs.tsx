import {
  MaterialTopTabBar,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { GALLERIES } from '../../features/gallery/descriptors'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyleList } from '../../features/themed/hooks'
import { useScreenLoading } from '../../lib/helpers/native/hook.screenLoad'
import NavigationFilterButton from '../../navigation/elements/NavigationButton.Filter'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { FONT_MEDIUM } from '../../styles/fonts'
import { useText } from '../../translations/hook'
import ScreenGallery from './Screen.Gallery'

const Tab = createMaterialTopTabNavigator<ScreensProps>()

const GalleriesTabsScreen = () => {
  const text = useText()
  const { styles, colors } = useThemedStyleList({
    header: headerThemedStyles,
    tabs: tabsThemedStyles,
  })
  const isLoaded = useScreenLoading()

  return (
    <View style={screenStyles.container}>
      <ScreenHeader
        style={styles.header}
        title={text.gallery}
        headerLeft={
          <NavigationFilterButton iconColor={colors.appHeaderIconLight} />
        }
      />
      {isLoaded ? (
        <Tab.Navigator
          style={styles.tabs.container}
          sceneContainerStyle={styles.tabs.sceneContainer}
          tabBar={(props) => {
            return (
              <View style={styles.tabs.wrapper}>
                <MaterialTopTabBar {...props} />
              </View>
            )
          }}
          screenOptions={{
            tabBarGap: 40,
            tabBarPressColor: 'transparent',
            tabBarIndicatorStyle: styles.tabs.indicator,
            tabBarItemStyle: styles.tabs.item,
            tabBarLabelStyle: styles.tabs.label,
            tabBarContentContainerStyle: styles.tabs.itemsContainer,
            tabBarStyle: styles.tabs.tabBar,
          }}
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

const headerThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary1,
    },
  })
)

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
      fontFamily: FONT_MEDIUM,
      fontSize: 18,
      textTransform: 'none',
    },
    tabBar: {
      justifyContent: 'center',
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: colors.tabsLine,
    },
    item: {
      width: 'auto',
      paddingHorizontal: 20,
      paddingBottom: 12,
      paddingTop: 32,
    },
    indicator: {
      backgroundColor: colors.tabsSelectedTint,
      height: 1,
    },
    itemsContainer: {
      justifyContent: 'center',
    },
  })
)

const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
