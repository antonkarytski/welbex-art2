import React from 'react'
import PopUpLogOut from './PopUp.LogOut'
import PopUpRecoverPassword from './PopUp.RecoverPassword'

export default function AuthPopUps() {
  return (
    <>
      <PopUpLogOut />
      <PopUpRecoverPassword />
    </>
  )
}
