import React from 'react'
import ImageCropper from '../imagePick/imageCropper/ImageCropper'
import PopUpAgeError from './PopUp.AgeError'
import {
  PopUpArtWorksLimitExceedFree,
  PopUpArtWorksLimitExceedPaid,
} from './PopUp.ArtWorksLimitExceed'
import PopUpDeletePaymentCard from './PopUp.DeletePaymentCard'
import PopUpPhotoEdit from './PopUp.PhotoEditActionSelect'
import PopUpUnexpectedError from './PopUp.UnexpectedError'
import AuthPopUps from './authPopUps'
import ProfilePopUps from './profilePopUps'

export default function AppPopUps() {
  return (
    <>
      <ImageCropper />
      <AuthPopUps />
      <ProfilePopUps />
      <PopUpAgeError />
      <PopUpDeletePaymentCard />
      <PopUpPhotoEdit />
      <PopUpUnexpectedError />
      <PopUpArtWorksLimitExceedFree />
      <PopUpArtWorksLimitExceedPaid />
    </>
  )
}
