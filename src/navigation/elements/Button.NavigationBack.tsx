import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import ArrowIcon from '../../ui/icons/Icon.Arrow'

type NavigationBackButtonProps = {
  style?: ViewStyle
  iconColor: string
  iconSize?: number
  onPress?: () => void
}

const NavigationBackButton = ({
  style,
  iconColor,
  iconSize,
  onPress,
}: NavigationBackButtonProps) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={style}
      onPress={() => {
        onPress?.()
        navigation.goBack()
      }}
    >
      <ArrowIcon size={iconSize} color={iconColor} />
    </TouchableOpacity>
  )
}

export default NavigationBackButton
