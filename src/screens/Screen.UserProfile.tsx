import React, { useEffect } from 'react'
import { api } from '../api'
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
import { useRequest } from '../lib/models/apiBuilder/hooks'
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
  const userRequest = useRequest(api.users.profile)
  const user = userRequest.data
  const fullUser = user && { ...user, id: item.id }

  useEffect(() => {
    userRequest.request(item.id)
  }, [item.id])

  useEffect(() => {
    tabMenuNavigationModel.reset()
    artsListsRequestModel.reset()
    artsListsHeightModel.reset()
  }, [item.id])

  const onRefreshUser = () => userRequest.request(item.id)

  if (userRequest.isLoading) return <UserScreenSkeleton />
  if (!fullUser) return null

  return (
    <UserProfile
      user={fullUser}
      updateUser={userRequest.update}
      onRefreshUser={onRefreshUser}
      tabs={
        fullUser.is_child ? childrenDrawingsListTabs : commonDrawingsListTabs
      }
      artsTabMenuNavigationModel={tabMenuNavigationModel}
      artsListsRequestModel={artsListsRequestModel}
      artsListsHeightModel={artsListsHeightModel}
    />
  )
}

export default UserProfileScreen
