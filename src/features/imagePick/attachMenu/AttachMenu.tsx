import { useFocusEffect } from '@react-navigation/native'
import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import { StyleSheet, View } from 'react-native'
import { useAnimatedModel, useFnRef } from 'altek-toolkit'
import { SwipeMenu, Text } from 'altek-ui'
import { noop } from '../../../lib/helpers'
import { useUncontrolledList } from '../../../lib/helpers/hooks/hook.uncontrolledList'
import { withMiddleware } from '../../../lib/helpers/middleware'
import { useKeyboardSubscription } from '../../../lib/helpers/native/hook.keyboard'
import { useText } from '../../../translations/hook'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { ImageEditorResult } from '../camera/types'
import AttachMenuSendButton from './AttachMenuSendButton'
import ImagePickerRoll from './ImagePickerRoll/ImagePickerRoll'
import { SWIPE_MENU_PADDING } from './ImagePickerRoll/styles'
import { attachMenu, attachMenuSendButton } from './model'
import { AttachMenuProps, ImageNode } from './types'

function sendButtonToggle(shouldShow: boolean) {
  if (shouldShow) return attachMenuSendButton.showSync()
  attachMenuSendButton.hideSync()
}

function createImageNode(uri: string): ImageNode {
  const timestamp = Date.now()
  return {
    size: 0,
    uri,
    name: `img${timestamp}.jpg`,
    timestamp,
  }
}

const AttachMenu = React.memo(
  ({
    onSelectComplete,
    mountBlock,
    controller,
    pickLimit,
    postHandler,
    middleware,
    onOpen = noop,
  }: AttachMenuProps) => {
    const text = useText()
    const styles = useThemedStyle(themedStyles)
    const {
      list: selectedImages,
      clear: clearSelectedImages,
      set: setSelectedImages,
    } = useUncontrolledList<ImageNode>([], {
      onFilledChange: sendButtonToggle,
    })

    const isOnSend = useRef(false)
    const model = useAnimatedModel(attachMenu)
    const isShowComplete = model.currentStateValue === attachMenu.showValue

    const closeMenu = useCallback(() => {
      clearSelectedImages()
      attachMenu.hideSync()
      attachMenuSendButton.hideSync()
    }, [clearSelectedImages])

    const pickFromCamera = useCallback(
      (props: ImageEditorResult) => {
        if (props.uri) {
          withMiddleware(props.uri, middleware).then((uri) => {
            onSelectComplete({
              type: 'image',
              data: [createImageNode(uri)],
            })
          })
        }
        closeMenu()
      },
      [closeMenu, onSelectComplete, middleware]
    )

    async function sendImagesFromImagePicker() {
      if (isOnSend.current || !selectedImages.current.length) return
      isOnSend.current = true
      try {
        const currentSelected = [...selectedImages.current]
        const images = currentSelected.map(({ uri }) => uri)
        const uriList = await withMiddleware(images, middleware)
        if (!postHandler) {
          onSelectComplete({
            type: 'image',
            data: uriList.map((uri, index) => {
              return {
                ...currentSelected[index],
                uri,
              }
            }),
          })
          return closeMenu()
        }
        closeMenu()
      } finally {
        isOnSend.current = false
      }
    }

    useKeyboardSubscription({ onShow: closeMenu })
    useImperativeHandle(controller, () => ({ close: closeMenu }))
    useFocusEffect(attachMenu.hideSync)

    const onOpenRef = useFnRef(onOpen)
    useEffect(() => {
      if (!model.isMounted || mountBlock) return
      onOpenRef.current?.()
    }, [onOpenRef, model.isMounted, mountBlock])

    if (!model.isMounted || mountBlock) return null

    return (
      <SwipeMenu
        swipeLineStyle={styles.swipeLine}
        style={styles.swipeMenu}
        model={model}
      >
        <Text bold style={styles.title} label={text.gallery} />
        <ImagePickerRoll
          style={styles.list}
          postHandler={postHandler}
          pickLimit={pickLimit}
          isAbleToLoadCamera={isShowComplete}
          onSelect={setSelectedImages}
          onCameraSelect={pickFromCamera}
        />
        <View style={styles.footer}>
          <AttachMenuSendButton onPress={sendImagesFromImagePicker} />
        </View>
      </SwipeMenu>
    )
  },
  (
    { controller, onSelectComplete, ...prevProps },
    { controller: _, onSelectComplete: nextSelectComplete, ...nextProps }
  ) => {
    return (
      onSelectComplete === nextSelectComplete &&
      JSON.stringify(prevProps) === JSON.stringify(nextProps)
    )
  }
)

export default AttachMenu

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    swipeMenu: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      height: 655,
      shadowOpacity: 0,
      backgroundColor: colors.primary3,
    },
    title: {
      fontSize: 22,
      color: colors.text,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      marginBottom: 18,
    },
    swipeLine: {
      width: 36,
      height: 5,
      backgroundColor: colors.line,
    },
    footer: {
      backgroundColor: colors.screenBackground,
      height: 111,
    },
    list: {
      height: 480,
      paddingHorizontal: SWIPE_MENU_PADDING,
    },
  })
)
