import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { GalleryIcon } from 'altek-ui'
import { createTabScreenDescription } from '../../navigation/helpers'
import { links } from '../../navigation/links'
import PlusIcon from '../../ui/icons/Icon.Plus'
import AddPostDescriptionScreen from './Screen.AddPostDescription'
import UploadPostImageScreen from './Screen.UploadPostImage'

const Stack = createNativeStackNavigator()

const CreatePostScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={links.uploadPostImage}
        component={UploadPostImageScreen}
      />
      <Stack.Screen
        name={links.addPostDescription}
        component={AddPostDescriptionScreen}
      />
    </Stack.Navigator>
  )
}

export const createPostTabDescription = createTabScreenDescription({
  Icon: PlusIcon,
  Component: CreatePostScreen,
  link: links.createPostTab,
  label: (t) => t.create,
})
