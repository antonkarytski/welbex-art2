import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import UserAvatar from '../user/UserAvatar'
import { $userProfile } from './model'

type ProfileAvatarProps = {
  style?: StyleProp<ViewStyle>
}

const ProfileAvatar = React.memo(({ style }: ProfileAvatarProps) => {
  const user = useStore($userProfile)

  return <UserAvatar style={style} item={user} />
})

export default ProfileAvatar
