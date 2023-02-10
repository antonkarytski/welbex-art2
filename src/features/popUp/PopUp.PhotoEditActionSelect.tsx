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
import { createThemedStyle } from '../themed'
import { useThemedStyleList } from '../themed/hooks'

type PopUpPhotoEditActionSelectProps = {}

const model = PopUpFactory.createModel()

const PopUpPhotoEditActionSelect = PopUpFactory.appendModel(
  ({}: PopUpPhotoEditActionSelectProps) => {
    const text = useText()
    const popUp = usePopUpModel(model)

    const { styles, colors } = useThemedStyleList({
      row: touchableRowThemedStyles,
      common: themedStyles,
    })

    return (
      <PopUpCard style={styles.common.card} model={model}>
        <TouchableRow
          label={text.selectFromGallery}
          Icon={ImageIcon}
          onPress={() => {}}
          iconColor={colors.text}
          style={styles.row}
        />
        <ListItemSeparator />
        <TouchableRow
          label={text.takePhoto}
          Icon={CameraIcon}
          onPress={() => {}}
          iconColor={colors.text}
          style={styles.row}
        />
        <ListItemSeparator />
        <TouchableRow
          label={text.deleteCurrentPhoto}
          Icon={DeleteIcon}
          onPress={() => {}}
          iconColor={colors.errorText}
          style={{ ...styles.row, label: styles.common.deleteLabel }}
        />
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
