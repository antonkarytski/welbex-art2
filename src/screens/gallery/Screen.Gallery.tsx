import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from '@react-navigation/material-top-tabs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useThemedStyle } from '../../features/themed/hooks'
import { useScreenLoading } from '../../lib/helpers/hook.screenLoad'
import ScreenHeader from '../../navigation/elements/ScreenHeader'
import { FONT_REGULAR } from '../../styles/fonts'
import { useText } from '../../translations/hook'

const Tab = createMaterialTopTabNavigator()

export default function GalleryScreen() {
  const text = useText()
  const styles = useThemedStyle(themedStyles)
  const isLoaded = useScreenLoading()

  return (
    <View>
      <ScreenHeader style={styles} title={text.gallery} />
      {/*{isLoaded ? (*/}
      {/*  <Tab.Navigator*/}
      {/*    sceneContainerStyle={styles.sceneContainer}*/}
      {/*    tabBar={(props: MaterialTopTabBarProps) => <LoadsTabBar {...props} />}*/}
      {/*    screenOptions={(props) => {*/}
      {/*      const isFocused = props.navigation.isFocused()*/}
      {/*      return {*/}
      {/*        tabBarPressColor: 'transparent',*/}
      {/*        tabBarLabelStyle: [*/}
      {/*          styles.tabBarLabel,*/}
      {/*          !isFocused && styles.unselectedLabel,*/}
      {/*        ],*/}
      {/*        tabBarIndicatorStyle: styles.tabBarIndicator,*/}
      {/*        tabBarStyle: styles.tabBar,*/}
      {/*      }*/}
      {/*    }}*/}
      {/*    initialRouteName={links.loadsListTab}*/}
      {/*  >*/}
      {/*    <Tab.Screen*/}
      {/*      options={{*/}
      {/*        title: t.loads,*/}
      {/*      }}*/}
      {/*      name={links.loadsListTab}*/}
      {/*      component={LoadsListTab}*/}
      {/*    />*/}
      {/*    <Tab.Screen*/}
      {/*      options={{*/}
      {/*        title: t.Bids,*/}
      {/*      }}*/}
      {/*      name={links.activeBidsListTab}*/}
      {/*      component={ActiveLoadsListTab}*/}
      {/*    />*/}
      {/*  </Tab.Navigator>*/}
      {/*) : null}*/}
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary1,
    },
  })
)

export const loadsScreenThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    headerContainer: {
      marginBottom: 12,
      marginTop: 32,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    header: {
      color: colors.text,
    },
    sceneContainer: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    tabContainer: {
      flex: 1,
      backgroundColor: colors.screenBackground,
    },
    tabBarContainer: {
      flexDirection: 'row',
      backgroundColor: colors.screenBackground,
      justifyContent: 'space-between',
      marginBottom: 13,
    },
    tabBarButtonsContainer: {
      //width: screenWidth - 88,
      //fontFamily: FONT_BOLD,
      backgroundColor: colors.card,
      paddingHorizontal: 2,
      borderRadius: 10,
    },
    tabBarFilterContainer: {
      width: 44,
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    tabBarFilter: {
      backgroundColor: colors.card,
      justifyContent: 'center',
      alignItems: 'center',
      width: 44,
      height: 44,
      borderRadius: 10,
    },
    tabBarFilterDisabled: {
      //backgroundColor: colors.inactiveButton,
    },
    tabBarLabel: {
      fontSize: 16,
      lineHeight: 16,
      //fontFamily: FONT_MEDIUM,
      textTransform: 'none',
      color: colors.text,
    },
    tabBarIndicator: {
      height: 40,
      marginBottom: 2,
      borderRadius: 10,
      //backgroundColor: colors.accentGray,
    },
    tabBar: {
      height: 44,
      elevation: 0,
      backgroundColor: colors.card,
      borderRadius: 10,
    },
    unselectedLabel: {
      color: colors.subText,
      fontFamily: FONT_REGULAR,
    },
    loadIndicatorContainer: {},
  })
)
