import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import { useCallback, useEffect } from 'react'
import { MyProfile } from '../../api/parts/users/types'
import { $isAuth } from '../auth/model'
import PopUpAgeError from '../popUp/PopUp.AgeError'
import {
  PopUpArtWorksLimitExceedFree,
  PopUpArtWorksLimitExceedPaid,
} from '../popUp/PopUp.ArtWorksLimitExceed'
import PopUpLogin from '../popUp/profilePopUps/PopUp.Login'
import { $myProfile } from '../profile/model'
import { userAge } from '../user/helpers'
import { FREE_UPLOADS_LIMIT, PAID_UPLOADS_LIMIT } from './constants'

type GetPopUpProps = {
  isAuth: boolean
  myProfile: MyProfile | null
}

const getPopUp = ({ isAuth, myProfile }: GetPopUpProps) => {
  if (!isAuth || !myProfile) return PopUpLogin
  if (!myProfile.is_child || userAge(myProfile) < 2) return PopUpAgeError
  const uploadWorksCount = myProfile.works_uploaded_in_this_month || 0
  if (!myProfile.subscription && uploadWorksCount > FREE_UPLOADS_LIMIT) {
    return PopUpArtWorksLimitExceedFree
  }
  if (uploadWorksCount > PAID_UPLOADS_LIMIT) {
    return PopUpArtWorksLimitExceedPaid
  }
}

export const useCreatePostRedirection = () => {
  const isAuth = useStore($isAuth)
  const myProfile = useStore($myProfile)
  const navigation = useNavigation()

  const checkForRedirection = useCallback(() => {
    console.log(navigation.getState())
    const popUp = getPopUp({ isAuth, myProfile })
    if (popUp) {
      popUp.showSync()
      navigation.goBack()
    }
  }, [navigation, myProfile, isAuth])

  useFocusEffect(checkForRedirection)
}
