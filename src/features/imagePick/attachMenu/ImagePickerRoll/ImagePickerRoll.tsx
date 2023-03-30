import CameraRoll, { PhotoIdentifier } from '@react-native-community/cameraroll'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import { ImageEditorType } from 'altek-ui'
import { noop } from '../../../../lib/helpers'
import { useUncontrolledList } from '../../../../lib/helpers/hooks/hook.uncontrolledList'
import { createThemedStyle } from '../../../themed'
import { useThemedStyle } from '../../../themed/hooks'
import { useCameraPreview } from '../../camera/hook.cameraPreview'
import { CameraProps, ImageEditorResult } from '../../camera/types'
import { useMediaLibraryPermission } from '../../permission.mediaLibrary'
import { ImageNode } from '../types'
import PermissionNotGrantedInfo from './PermissionNotGrantedInfo'
import PickerCell, { PickerCellOnPressProps } from './PickerCell'

type ImagePickerRollProps = {
  onSelect: (uri: ImageNode[]) => void
  onCameraSelect: (props: ImageEditorResult) => void
  isAbleToLoadCamera?: boolean
  cameraProps?: CameraProps
  postHandler?: ImageEditorType
  pickLimit?: number
  style?: StyleProp<ViewStyle>
}

type NextPageInfo = {
  endCursor?: string
  hasNextPage: boolean | null
}

function toImageNode({ node }: PhotoIdentifier): ImageNode {
  return {
    uri: node.image.uri,
    timestamp: node.timestamp,
    name: node.image.filename,
    size: node.image.fileSize,
  }
}

const keyExtractor = ({ uri }: ImageNode) => uri

const ImagePickerRoll = ({
  onSelect,
  pickLimit,
  style,
}: ImagePickerRollProps) => {
  const styles = useThemedStyle(themedStyles)
  const mediaLibraryPermission = useMediaLibraryPermission()
  const { update: updateSelectedImages, list } = useUncontrolledList<ImageNode>(
    [],
    {
      maxCount: pickLimit,
      onUpdate: onSelect,
    }
  )
  const unselectPreviousItem = useRef<(() => void) | null>(null)
  const nextPageInfo = useRef<NextPageInfo | null>(null)
  const [assets, setAssets] = useState<ImageNode[]>([])
  const camera = useCameraPreview()

  const onNextPage = useCallback(async () => {
    const info = nextPageInfo.current
    if (!info || !info.hasNextPage || !info.endCursor) return

    try {
      const media = await CameraRoll.getPhotos({
        after: info.endCursor,
        first: 20,
      })
      if (!media.edges) return
      setAssets((state) => {
        const images: ImageNode[] = media.edges.map(toImageNode)
        return [...state, ...images]
      })
      nextPageInfo.current = {
        endCursor: media.page_info.end_cursor,
        hasNextPage: media.page_info.has_next_page,
      }
    } catch {}
  }, [])

  const getAssets = useCallback(async () => {
    try {
      const isRequestGranted = await mediaLibraryPermission.get()
      if (!isRequestGranted) return
      const media = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      })
      if (media.edges) {
        const images = media.edges.map(toImageNode)
        //setAssets([cameraImageNode, ...images])
        setAssets(images)
        nextPageInfo.current = {
          endCursor: media.page_info.end_cursor,
          hasNextPage: media.page_info.has_next_page,
        }
      }
    } catch {}
  }, [mediaLibraryPermission])

  useEffect(() => {
    getAssets().catch(noop)
  }, [getAssets])

  const onCellPress = useCallback(
    ({ isSelected, unselect, image }: PickerCellOnPressProps) => {
      if (isSelected && pickLimit === 1) {
        unselectPreviousItem.current?.()
        unselectPreviousItem.current = unselect
      } else if (isSelected && pickLimit && list.current.length >= pickLimit) {
        unselect?.()
      } else {
        unselectPreviousItem.current = null
      }

      updateSelectedImages(image)
    },
    [pickLimit, updateSelectedImages, list]
  )

  const renderItem = useCallback(
    ({ item }: { item: ImageNode }) => {
      return <PickerCell image={item} onPress={onCellPress} />
    },
    [onCellPress]
  )

  if (!mediaLibraryPermission.isGranted) {
    return <PermissionNotGrantedInfo />
  }

  return (
    <FlatList
      bounces={false}
      data={assets}
      renderItem={renderItem}
      onEndReached={onNextPage}
      keyExtractor={keyExtractor}
      viewabilityConfigCallbackPairs={camera.viewabilityConfig.current}
      style={style}
      columnWrapperStyle={styles.listColumns}
      numColumns={3}
      initialNumToRender={20}
      initialScrollIndex={0}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  )
}

export default ImagePickerRoll

const themedStyles = createThemedStyle(() =>
  StyleSheet.create({
    listColumns: {
      justifyContent: 'space-between',
    },
  })
)
