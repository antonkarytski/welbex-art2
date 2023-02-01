import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { View } from 'react-native'
import { NamedStyles } from '../../features/themed/createThemedStyles'
import { ColorThemeStructure } from '../../features/themed/theme'
import { MainTabBarStyles } from '../../screens/styles'
import Row from '../../ui/Row'
import IconButton from '../../ui/buttons/IconButton'
import AdaptiveGradient from '../../ui/gradients/AdaptiveGradient'

type CustomBottomTabBarProps = {
  style: NamedStyles<MainTabBarStyles>
  colors: ColorThemeStructure
} & BottomTabBarProps

const MainBottomTabBar = ({
  state,
  descriptors,
  navigation,
  style,
  colors,
}: CustomBottomTabBarProps) => {
  return (
    <AdaptiveGradient
      colors={{
        start: colors.bottomTabGradientLight,
        end: colors.bottomTabGradientDark,
      }}
      stopOffset={'20%'}
    >
      <View style={style.tabBar}>
        <Row style={style.row}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key]
            const { tabBarIcon, title } = options
            const isFocused = state.index === index

            const onNavigate = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              })

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({
                  name: route.name,
                  merge: true,
                  params: route.params,
                })
              }
            }

            return (
              <IconButton
                key={route.key}
                Icon={(props) =>
                  tabBarIcon?.({
                    ...props,
                    focused: isFocused,
                    color: props.color || '#fff',
                    size: props.size || 24,
                  })
                }
                onPress={onNavigate}
                label={title}
                iconSize={24}
                iconColor={
                  isFocused
                    ? colors.bottomTabActiveItem
                    : colors.bottomTabInactiveItem
                }
                labelStyle={[style.tabBarLabel, isFocused && style.activeTint]}
              />
            )
          })}
        </Row>
      </View>
    </AdaptiveGradient>
  )
}

export default MainBottomTabBar
