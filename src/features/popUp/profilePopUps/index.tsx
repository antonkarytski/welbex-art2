import React from 'react'
import PopUpDeleteAvatar from './PopUp.DeleteAvatar'
import PopUpSaveProfileChanges from './PopUp.SaveChanges'

export default function ProfilePopUps() {
  return (
    <>
      <PopUpSaveProfileChanges />
      <PopUpDeleteAvatar />
    </>
  )
}
