import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native'
import { UserProfileResponse } from '../../api/parts/users/types.api'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../styles/buttons'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { $isAuth } from '../auth/model'
import { $myProfile } from '../profile/model'
import { useThemedStyleList } from '../themed/hooks'
import { toggleFollow } from './request'

export type FollowButtonStyles = {
  container?: StyleProp<ViewStyle>
  button?: StyleProp<ViewStyle>
  label?: StyleProp<TextStyle>
}

export type FollowButtonProps = {
  item: UserProfileResponse & { id: number }
  onPress?: (isFollowed: boolean) => void
  style?: FollowButtonStyles
}

const FollowButton = ({ item, onPress, style }: FollowButtonProps) => {
  const t = useText()
  const navigate = useNavigate()
  const isAuth = useStore($isAuth)
  const myProfile = useStore($myProfile)
  const isMyProfile = item.id === myProfile?.id

  const { styles: stylesPreset } = useThemedStyleList({
    follow: buttonPrimaryThemedPreset,
    unFollow: buttonLightThemedPreset,
  })

  const onFollow = () => {
    if (!isAuth) return navigate(links.login)
    toggleFollow(item).then(() => {
      onPress?.(!item.is_followed)
    })
  }

  if (isMyProfile) return null

  return (
    <View style={[styles.container, style?.container]}>
      <PresetButton
        label={item.is_followed ? t.unfollow : t.follow}
        onPress={onFollow}
        style={style?.button}
        labelStyle={style?.label}
        preset={item.is_followed ? stylesPreset.unFollow : stylesPreset.follow}
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
