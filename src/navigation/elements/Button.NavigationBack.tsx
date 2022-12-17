import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import HeaderBackChevronIcon from '../../ui/icons/Icon.HeaderBackChevron'

type NavigationBackButtonProps = {
  style?: ViewStyle
  color: string
  iconSize?: number
  onPress?: () => void
}

const NavigationBackButton = ({
  style,
  color,
  iconSize,
  onPress,
}: NavigationBackButtonProps) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={style}
      onPress={() => {
        onPress?.()
        navigation.goBack()
      }}
    >
      <HeaderBackChevronIcon size={iconSize} color={color} />
    </TouchableOpacity>
  )
}

export default NavigationBackButton
