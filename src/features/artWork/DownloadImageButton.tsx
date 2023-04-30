import React, { useEffect, useRef, useState } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { ArtWork } from '../../api/parts/arts/types'
import { downloadImageFromUrl } from '../../lib/files/download'
import { getNameFromUrl } from '../../lib/files/helpers'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import { useSubscriptionCheck } from '../user/hook.subscritption'
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
  //const isHaveSubscription = useSubscriptionCheck()

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
        const originalName = getNameFromUrl(artWork.image_thumbnail)
        downloadFullSizeDrawing(
          artWork.id,
          originalName
        ).finally(() => {
          if (isFocused.current) setIsLoading(false)
        })
        // const request = isHaveSubscription
        //   ? downloadFullSizeDrawing(artWork.id, originalName)
        //   : downloadImageFromUrl(artWork.image_thumbnail)
        // request.finally(() => {
        //   if (isFocused.current) setIsLoading(false)
        // })
      }}
    />
  )
}

export default DownloadImageButton
