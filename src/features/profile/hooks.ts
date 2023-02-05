import { useStore } from 'effector-react'
import {
  TabsDescriptor,
  UseDrawingsTabsSettings,
  commonDrawingsListTabs,
  useDrawingsTabs,
} from '../user/drawingsList2/hooks.drawingTabs'
import { UserDrawingListType } from '../user/types'
import { $userProfile } from './model'

const currentUserDrawingsTabs: TabsDescriptor = {
  [UserDrawingListType.OWN]: { label: (text) => text.myGallery },
  ...commonDrawingsListTabs,
}

export function useProfileDrawingsListTabs(settings?: UseDrawingsTabsSettings) {
  const profile = useStore($userProfile)
  return useDrawingsTabs(currentUserDrawingsTabs, profile, settings)
}
