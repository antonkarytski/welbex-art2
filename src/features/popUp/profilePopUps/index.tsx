import React from 'react'
import PopUpDeleteAvatar from './PopUp.DeleteAvatar'
import PopUpLogin from './PopUp.Login'
import PopUpSaveProfileChanges from './PopUp.SaveChanges'

export default function ProfilePopUps() {
  return (
    <>
      <PopUpSaveProfileChanges />
      <PopUpDeleteAvatar />
      <PopUpLogin />
    </>
  )
}
