import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import Span from '../../ui/Span'

export default function ProfileScreen() {
  const navigate = useNavigate()

  return (
    <TouchableOpacity
      onPress={() => {
        navigate(links.editProfile)
      }}
    >
      <Span>Profile Screen</Span>
    </TouchableOpacity>
  )
}
