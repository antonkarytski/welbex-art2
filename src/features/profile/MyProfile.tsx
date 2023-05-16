import { useFocusEffect } from '@react-navigation/native'
import { useStore } from 'effector-react'
import React from 'react'
import { noop } from '../../lib/helpers'
import UserScreenSkeleton from '../../ui/loaders/Skeleton.UserScreen'
import UserProfile from '../user/UserProfile'
import {
  commonDrawingsListTabs,
  profileDrawingsListTabs,
} from '../user/drawingsList/hooks.drawingTabs'
import {
  createUserArtsListHeightModel,
  createUserArtsTabMenuNavigationModel,
} from '../user/drawingsList/model.layout'
import { createUserArtsListsRequestModel } from '../user/drawingsList/request'
import { $myProfile } from './model'
import { meRequest, refreshProfile, refreshProfileLimited } from './request'

const profileTabMenuNavigationModel = createUserArtsTabMenuNavigationModel()
const profileArtsListRequestModel = createUserArtsListsRequestModel()
const profileArtsListsHeightModel = createUserArtsListHeightModel()
const MyProfile = () => {
  const myProfile = useStore($myProfile)
  const isLoading = useStore(meRequest.pending)
  const isRefreshing = useStore(refreshProfile.pending)

  useFocusEffect(refreshProfileLimited)

  if (isLoading && !isRefreshing) return <UserScreenSkeleton />
  if (!myProfile) return null

  return (
    <UserProfile
      user={myProfile}
      tabs={
        myProfile.is_child ? profileDrawingsListTabs : commonDrawingsListTabs
      }
      onRefreshUser={() => refreshProfile().catch(noop)}
      artsTabMenuNavigationModel={profileTabMenuNavigationModel}
      artsListsRequestModel={profileArtsListRequestModel}
      artsListsHeightModel={profileArtsListsHeightModel}
    />
  )
}

export default MyProfile
