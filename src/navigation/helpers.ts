import { ScreenDescriptor } from './types'

export const screenOptions = (title?: string) => {
  return {
    title: title || '',
    headerShown: true,
    headerBackTitleVisible: false,
  }
}

export const createTabScreenDescription = (descriptor: ScreenDescriptor) =>
  descriptor
