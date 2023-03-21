import React from 'react'
import PopUpAgeError from './PopUp.AgeError'
import PopUpDeletePaymentCard from './PopUp.DeletePaymentCard'
import PopUpPhotoEdit from './PopUp.PhotoEditActionSelect'
import PopUpUnexpectedError from './PopUp.UnexpectedError'
import AuthPopUps from './authPopUps'
import ProfilePopUps from './profilePopUps'

export default function AppPopUps() {
  return (
    <>
      <AuthPopUps />
      <ProfilePopUps />
      <PopUpAgeError />
      <PopUpDeletePaymentCard />
      <PopUpPhotoEdit />
      <PopUpUnexpectedError />
    </>
  )
}
