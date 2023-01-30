import React from 'react'
import PopUpAgeError from './PopUp.AgeError'
import PopUpDeletePaymentCard from './PopUp.DeletePaymentCard'
import PopUpPhotoEdit from './PopUp.PhotoEditActionSelect'
import PopUpSaveChanges from './PopUp.SaveChanges'
import PopUpUnexpectedError from './PopUp.UnexpectedError'
import AuthPopUps from './authPopUps'

export default function AppPopUps() {
  return (
    <>
      <AuthPopUps />
      <PopUpAgeError />
      <PopUpDeletePaymentCard />
      <PopUpPhotoEdit />
      <PopUpSaveChanges />
      <PopUpUnexpectedError />
    </>
  )
}
