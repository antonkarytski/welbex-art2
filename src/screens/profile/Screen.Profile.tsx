import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import ProfileCountersBlock from '../../features/profile/ProfileCountersBlock'
import ProfileHeader from '../../features/profile/ProfileHeader'
import ProfileWorksTabs from '../../features/profile/ProfileWorksTabs'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'

const ProfileScreen = () => {
  const navigate = useNavigate()

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader />
      <ProfileCountersBlock
        style={{
          marginTop: 32,
        }}
      />
      <ProfileWorksTabs />
    </View>
  )
}

export default ProfileScreen
