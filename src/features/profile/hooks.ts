import { useStore } from 'effector-react'
import {
  TabListSettings,
  TabsDescriptor,
  commonDrawingsListTabs,
  useDrawingsTabs,
} from '../user/drawingsList/hooks.drawingTabs'
import { UserDrawingListType } from '../user/types'
import { $userProfile } from './model'

const currentUserDrawingsTabs: TabsDescriptor = {
  [UserDrawingListType.OWN]: { label: (text) => text.myGallery },
  ...commonDrawingsListTabs,
}

export function useProfileDrawingsListTabs(settings?: TabListSettings) {
  const profile = useStore($userProfile)
  return useDrawingsTabs(currentUserDrawingsTabs, profile, settings)
}
