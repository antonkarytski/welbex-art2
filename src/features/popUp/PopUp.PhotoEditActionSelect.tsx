import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import { StyleSheet } from 'react-native'
import { PopUpFactory } from '../../lib/models/popUp/factory'
import { usePopUpModel } from '../../lib/models/popUp/hooks'
import { useText } from '../../translations/hook'
import TouchableRow from '../../ui/TouchableRow'
import CameraIcon from '../../ui/icons/Icon.Camera'
import DeleteIcon from '../../ui/icons/Icon.Delete'
import ImageIcon from '../../ui/icons/Icon.Image'
import ListItemSeparator from '../../ui/lists/ListItemSeparator'
import PopUpCard from '../../ui/popUp/PopUpCard'
import { singlePhotoTask, useCameraNavigate } from '../camera/hooks'
import { pickFromCameraRoll } from '../imagePick/pickFiles'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type PopUpPhotoEditActionSelectProps = {
  hideRemoveButton?: boolean
  onPick?: (assets: ImagePickerAsset[]) => void
  backOnPick?: boolean
  onRemoveButtonPress?: () => void
}

const model = PopUpFactory.createModel<PopUpPhotoEditActionSelectProps>()

const PopUpPhotoEditActionSelect = PopUpFactory.appendModel(
  (props: PopUpPhotoEditActionSelectProps) => {
    const popUp = usePopUpModel(model)
    const { hideRemoveButton, ...cameraProps } = {
      ...popUp.props,
      ...props,
    }

    const text = useText()
    const goToCamera = useCameraNavigate(singlePhotoTask(cameraProps))

    const { styles, colors } = useThemedStyleList({
      row: touchableRowThemedStyles,
      common: themedStyles,
    })

    return (
      <PopUpCard style={styles.common.card} model={model}>
        <TouchableRow
          label={text.selectFromGallery}
          Icon={ImageIcon}
          onPress={() => {
            model.hideSync()
            pickFromCameraRoll()
              .then((assets) => {
                if (assets) cameraProps.onPick?.(assets)
              })
              .catch(() => {})
          }}
          iconColor={colors.text}
          style={styles.row}
        />
        <ListItemSeparator />
        <TouchableRow
          label={text.takePhoto}
          Icon={CameraIcon}
          onPress={() => {
            model.hideSync()
            goToCamera()
          }}
          iconColor={colors.text}
          style={styles.row}
        />
        {!hideRemoveButton && (
          <>
            <ListItemSeparator />
            <TouchableRow
              label={text.deleteCurrentPhoto}
              Icon={DeleteIcon}
              onPress={() => {
                model.hideSync()
                cameraProps.onRemoveButtonPress?.()
              }}
              iconColor={colors.errorText}
              style={{ ...styles.row, label: styles.common.deleteLabel }}
            />
          </>
        )}
      </PopUpCard>
    )
  },
  model
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 20,
    },
    deleteLabel: {
      color: colors.errorText,
    },
  })
)

const touchableRowThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.text,
    },
  })
)

export default PopUpPhotoEditActionSelect
