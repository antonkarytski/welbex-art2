import { useRequest } from '@heyheyjude/toolkit'
import React, { useEffect, useState } from 'react'
import UserProfile from '../features/user/UserProfile'
import {
  childrenDrawingsListTabs,
  commonDrawingsListTabs,
} from '../features/user/drawingsList/hooks.drawingTabs'
import {
  createUserArtsListHeightModel,
  createUserArtsTabMenuNavigationModel,
} from '../features/user/drawingsList/model.layout'
import { createUserArtsListsRequestModel } from '../features/user/drawingsList/request'
import { profileResponseToUserProfile } from '../features/user/helpers'
import { getUserRequest } from '../features/user/request'
import { links } from '../navigation/links'
import { ScreenComponentProps } from '../navigation/types.screenProps'
import UserScreenSkeleton from '../ui/loaders/Skeleton.UserScreen'

const tabMenuNavigationModel = createUserArtsTabMenuNavigationModel()
const artsListsRequestModel = createUserArtsListsRequestModel()
const artsListsHeightModel = createUserArtsListHeightModel()

const UserProfileScreen = ({
  route,
}: ScreenComponentProps<links.userProfile>) => {
  const item = route.params.item
  const userRequest = useRequest(getUserRequest)
  const user = userRequest.data
  const profile = user ? profileResponseToUserProfile(user, item.id) : null
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    userRequest.request(item.id)
  }, [item.id])

  useEffect(() => {
    tabMenuNavigationModel.reset()
    artsListsRequestModel.reset()
    artsListsHeightModel.reset()
  }, [item.id])

  const onRefreshUser = () => {
    setIsRefreshing(true)
    userRequest.request(item.id).finally(() => {
      setIsRefreshing(false)
    })
  }

  if (userRequest.isLoading && !isRefreshing) return <UserScreenSkeleton />
  if (!profile) return null

  return (
    <UserProfile
      user={profile}
      updateUser={userRequest.update}
      onRefreshUser={onRefreshUser}
      tabs={
        profile.is_child ? childrenDrawingsListTabs : commonDrawingsListTabs
      }
      artsTabMenuNavigationModel={tabMenuNavigationModel}
      artsListsRequestModel={artsListsRequestModel}
      artsListsHeightModel={artsListsHeightModel}
    />
  )
}

export default UserProfileScreen
