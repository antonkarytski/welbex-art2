import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import UserCountersBlock from '../user/UserCountersBlock'
import { $userProfile } from './model'

type ProfileCountersBlockProps = {
  style?: StyleProp<ViewStyle>
}

const ProfileCountersBlock = ({ style }: ProfileCountersBlockProps) => {
  const profile = useStore($userProfile)

  return <UserCountersBlock style={style} item={profile} />
}

export default ProfileCountersBlock
