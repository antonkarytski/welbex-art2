import React from 'react'
import { Stack } from '../../navigation/elements/StackNavigator'
import TabStackNavigator from '../../navigation/elements/TabStackNavigator'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import PlusIcon from '../../ui/icons/Icon.PlusCircled'
import UploadPostImageScreen from './Screen.UploadPostImage'

const CreatePostScreen = () => {
  return (
    <TabStackNavigator>
      <Stack.Screen
        name={links.createPostUploadImage}
        component={UploadPostImageScreen}
      />
    </TabStackNavigator>
  )
}

export const createPostTabDescription = createTabScreenDescription({
  Icon: PlusIcon,
  Component: CreatePostScreen,
  link: links.createPostTab,
  label: (t) => t.create,
  unmountOnBlur: true,
})
