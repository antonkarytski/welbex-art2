import { useStore } from 'effector-react'
import React from 'react'
import { CATEGORIES_MAX_AGE } from '../../constants/categories'
import { $isAuth } from '../../features/auth/model'
import UnauthorizedProfile from '../../features/profile/UnauthorizedProfile'
import { $myProfile } from '../../features/profile/model'
import { meRequest } from '../../features/profile/request'
import UserProfile from '../../features/user/UserProfile'
import {
  commonDrawingsListTabs,
  profileDrawingsListTabs,
} from '../../features/user/drawingsList/hooks.drawingTabs'
import {
  createUserArtsListHeightModel,
  createUserArtsTabMenuNavigationModel,
} from '../../features/user/drawingsList/model.layout'
import { createUserArtsListsRequestModel } from '../../features/user/drawingsList/request'
import { getAgeFromBirthday } from '../../lib/helpers/date'
import UserScreenSkeleton from '../../ui/loaders/Skeleton.UserScreen'

const profileTabMenuNavigationModel = createUserArtsTabMenuNavigationModel()
const profileArtsListRequestModel = createUserArtsListsRequestModel()
const profileArtsListsHeightModel = createUserArtsListHeightModel()

const ProfileScreen = () => {
  const isAuth = useStore($isAuth)
  const myProfile = useStore($myProfile)
  const isLoading = useStore(meRequest.pending)

  if (!isAuth) return <UnauthorizedProfile />
  if (isLoading) return <UserScreenSkeleton />
  if (!myProfile) return null

  return (
    <UserProfile
      user={myProfile}
      tabs={
        getAgeFromBirthday(myProfile.DOB) > CATEGORIES_MAX_AGE
          ? commonDrawingsListTabs
          : profileDrawingsListTabs
      }
      artsTabMenuNavigationModel={profileTabMenuNavigationModel}
      artsListsRequestModel={profileArtsListRequestModel}
      artsListsHeightModel={profileArtsListsHeightModel}
    />
  )
}

export default ProfileScreen
