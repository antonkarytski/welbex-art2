import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import ProfileHeader from '../../features/profile/ProfileHeader'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'

const ProfileScreen = () => {
  const navigate = useNavigate()

  return (
    <View>
      <ProfileHeader />
    </View>
  )
}

export default ProfileScreen
