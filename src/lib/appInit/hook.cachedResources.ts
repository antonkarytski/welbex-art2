import { Ionicons } from '@expo/vector-icons'
import { loadAsync } from 'expo-font'
import { useEffect, useState } from 'react'
import { apiManager } from '../../api/apiManager'
import { initCameraPermission } from '../../features/camera/model.permissions'
import { meRequest } from '../../features/profile/request'
import * as FONTS from '../../styles/fonts'
import { noop } from '../helpers'

async function loadResourcesAndData() {
  const Inter400 = require('../../../assets/fonts/Inter/Inter-Regular.ttf')
  const Inter500 = require('../../../assets/fonts/Inter/Inter-Medium.ttf')
  const Inter600 = require('../../../assets/fonts/Inter/Inter-SemiBold.ttf')
  const Inter700 = require('../../../assets/fonts/Inter/Inter-Bold.ttf')

  await loadAsync({
    ...Ionicons.font,
    [FONTS.FONT_REGULAR]: Inter400,
    [FONTS.FONT_MEDIUM]: Inter500,
    [FONTS.FONT_SEMI_BOLD]: Inter600,
    [FONTS.FONT_BOLD]: Inter700,
  })
}

export function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false)

  useEffect(() => {
    initCameraPermission()
    loadResourcesAndData().finally(() => setLoadingComplete(true))
    apiManager.token.onInit((token) => {
      if (token) meRequest().catch(noop)
    })
  }, [])

  return isLoadingComplete
}
