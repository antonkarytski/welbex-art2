import { useStore } from 'effector-react'
import React, { useState } from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { UserShort } from '../../api/parts/users/types'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../styles/buttons'
import { useText } from '../../translations/hook'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import { $isAuth } from '../auth/model'
import { $myProfile } from '../profile/model'
import { useThemedStyleList } from '../themed/hooks'
import { toggleFollowRequest } from './request'

export type FollowButtonStyles = {
  container?: StyleProp<ViewStyle>
  button?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
}

export type FollowButtonProps = {
  item: UserShort
  onPress?: (isFollowed: boolean) => void
  style?: FollowButtonStyles
  loaderSize?: number
}

const FollowButton = ({
  item,
  onPress,
  style,
  loaderSize,
}: FollowButtonProps) => {
  const t = useText()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const myProfile = useStore($myProfile)
  const isMyProfile = item.id === myProfile?.id
  const [isLoading, setIsLoading] = useState(false)
  const [buttonWidth, setButtonWidth] = useState<string | number>(0)

  const { styles: stylesPreset, colors } = useThemedStyleList({
    follow: buttonPrimaryThemedPreset,
    unFollow: buttonLightThemedPreset,
  })

  const onFollow = () => {
    if (!isAuth) return navigate(links.login)
    setIsLoading(true)
    toggleFollowRequest(item)
      .then(() => {
        onPress?.(!item.is_followed)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  if (isMyProfile) return null

  return (
    <View
      style={[styles.container, style?.container]}
      onLayout={(e) => {
        setButtonWidth(e.nativeEvent.layout.width)
      }}
    >
      <AsyncPresetButton
        isLoading={isLoading}
        label={item.is_followed ? t.unfollow : t.follow}
        onPress={onFollow}
        style={[{ minWidth: buttonWidth }, style?.button]}
        labelStyle={style?.label}
        preset={item.is_followed ? stylesPreset.unFollow : stylesPreset.follow}
        loaderColor={item.is_followed ? colors.text : colors.whiteText}
        loaderSize={loaderSize}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
})

export default FollowButton
