import { ImagePickerAsset } from 'expo-image-picker'
import React from 'react'
import { StyleSheet } from 'react-native'
import { PopUpFactory } from '../../lib/models/popUp/factory'
import { usePopUpModel } from '../../lib/models/popUp/hooks'
import { useCameraNavigate, useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import TouchableRow from '../../ui/TouchableRow'
import CameraIcon from '../../ui/icons/Icon.Camera'
import DeleteIcon from '../../ui/icons/Icon.Delete'
import ImageIcon from '../../ui/icons/Icon.Image'
import ListItemSeparator from '../../ui/lists/ListItemSeparator'
import PopUpCard from '../../ui/popUp/PopUpCard'
import { pickFromCameraRoll } from '../imagePick/pickFiles'
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type PopUpPhotoEditActionSelectProps = {
  hideRemoveButton?: boolean
  onPick?: (assets: ImagePickerAsset[]) => void
}

const model = PopUpFactory.createModel<PopUpPhotoEditActionSelectProps>()

const PopUpPhotoEditActionSelect = PopUpFactory.appendModel(
  (props: PopUpPhotoEditActionSelectProps) => {
    const text = useText()
    const goToCamera = useCameraNavigate()
    const popUp = usePopUpModel(model)
    const { hideRemoveButton = props.hideRemoveButton, onPick = props.onPick } =
      popUp.props || {}

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
                if (assets) onPick?.(assets)
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
