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
  styles: NamedStyles<MainTabBarStyles>
  colors: ColorThemeStructure
} & BottomTabBarProps

const BottomTab = ({
  state,
  descriptors,
  navigation,
  styles,
  colors,
}: CustomBottomTabBarProps) => {
  return (
    <AdaptiveGradient
      startColor={colors.bottomTabGradientLight}
      endColor={colors.bottomTabGradientDark}
      stopOffset={'20%'}
    >
      <View style={styles.tabBar}>
        <Row style={[styles.row]}>
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
                navigation.navigate({ name: route.name, merge: true })
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
                labelStyle={[
                  styles.tabBarLabel,
                  isFocused && styles.activeTint,
                ]}
              />
            )
          })}
        </Row>
      </View>
    </AdaptiveGradient>
  )
}

export default BottomTab
