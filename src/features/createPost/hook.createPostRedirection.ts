import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useStore } from 'effector-react'
import { useCallback } from 'react'
import { AvailableCategoriesResponse } from '../../api/parts/categories/types'
import { MyProfile } from '../../api/parts/users/types'
import { $isAuth } from '../auth/model'
import PopUpAgeError from '../popUp/PopUp.AgeError'
import {
  PopUpArtWorksLimitExceedFree,
  PopUpArtWorksLimitExceedPaid,
} from '../popUp/PopUp.ArtWorksLimitExceed'
import PopUpLogin from '../popUp/profilePopUps/PopUp.Login'
import { $myProfile } from '../profile/model'
import { $availableCategories } from '../profile/model.availableCategories'
import { userAge } from '../user/helpers'

type GetPopUpProps = {
  isAuth: boolean
  myProfile: MyProfile | null
  availableCategories: AvailableCategoriesResponse | null
}

const getPopUp = ({
  isAuth,
  myProfile,
  availableCategories,
}: GetPopUpProps) => {
  if (!isAuth || !myProfile || !availableCategories) return PopUpLogin
  if (!myProfile.is_child || userAge(myProfile) < 2) return PopUpAgeError
  const isNoAvailableCategories =
    !availableCategories.current_month || !availableCategories.next_month
  if (!myProfile.subscription && isNoAvailableCategories) {
    return PopUpArtWorksLimitExceedFree
  }
  if (isNoAvailableCategories) {
    return PopUpArtWorksLimitExceedPaid
  }
}

export const useCreatePostRedirection = () => {
  const isAuth = useStore($isAuth)
  const myProfile = useStore($myProfile)
  const availableCategories = useStore($availableCategories)
  const navigation = useNavigation()

  const checkForRedirection = useCallback(() => {
    const popUp = getPopUp({ isAuth, myProfile, availableCategories })
    if (popUp) {
      popUp.showSync()
      navigation.goBack()
    }
  }, [navigation, myProfile, isAuth, availableCategories])

  useFocusEffect(checkForRedirection)
}
