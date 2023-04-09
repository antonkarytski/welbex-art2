import { useStoreMap } from 'effector-react'
import React, { useEffect, useRef, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { downloadImageFromUrl } from '../../lib/files/download'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import { $myProfile } from '../profile/model'
import { downloadFullSizeDrawing } from './request'

type DownloadImageButtonProps = {
  style?: StyleProp<ViewStyle>
  label: string
  artWork: ArtWork | undefined | null
}

const DownloadImageButton = ({
  style,
  label,
  artWork,
}: DownloadImageButtonProps) => {
  const isFocused = useRef(true)
  const [isLoading, setIsLoading] = useState(false)

  const isHaveSubscription = useStoreMap({
    store: $myProfile,
    keys: [],
    fn: (profile) => !!profile?.subscription,
  })

  useEffect(() => {
    return () => {
      isFocused.current = false
    }
  }, [])

  return (
    <AsyncPresetButton
      isLoading={isLoading}
      style={style}
      label={label}
      onPress={() => {
        if (!artWork) return
        setIsLoading(true)
        const request = isHaveSubscription
          ? downloadFullSizeDrawing(artWork.id)
          : downloadImageFromUrl(artWork.image_thumbnail)
        request.finally(() => {
          if (isFocused.current) setIsLoading(false)
        })
      }}
    />
  )
}

export default DownloadImageButton
