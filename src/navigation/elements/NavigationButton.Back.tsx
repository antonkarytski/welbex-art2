import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity, ViewStyle } from 'react-native'
import ArrowIcon from '../../ui/icons/Icon.Arrow'

type NavigationBackButtonProps = {
  style?: ViewStyle
  iconColor?: string
  iconSize?: number
  onPress?: () => void
  onAfterGoBack?: () => void
}

const NavigationBackButton = ({
  style,
  iconColor = 'white',
  iconSize,
  onPress,
  onAfterGoBack,
}: NavigationBackButtonProps) => {
  const navigation = useNavigation()

  const handlePress = () => {
    if (onPress) return onPress()
    navigation.goBack()
    onAfterGoBack?.()
  }

  return (
    <TouchableOpacity activeOpacity={0.6} style={style} onPress={handlePress}>
      <ArrowIcon size={iconSize} color={iconColor} />
    </TouchableOpacity>
  )
}

export default NavigationBackButton
