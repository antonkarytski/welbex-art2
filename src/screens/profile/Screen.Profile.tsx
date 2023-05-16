import { useStore } from 'effector-react'
import React from 'react'
import { $isAuth } from '../../features/auth/model'
import MyProfile from '../../features/profile/MyProfile'
import UnauthorizedProfile from '../../features/profile/UnauthorizedProfile'

const ProfileScreen = () => {
  const isAuth = useStore($isAuth)
  if (!isAuth) return <UnauthorizedProfile />
  return <MyProfile />
}

export default ProfileScreen
