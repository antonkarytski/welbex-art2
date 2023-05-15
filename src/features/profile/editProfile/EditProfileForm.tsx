import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { noop } from '../../../lib/helpers'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../../styles/buttons'
import { FONT_MEDIUM } from '../../../styles/fonts'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import DateField from '../../../ui/form/DateField'
import Field from '../../../ui/form/Field'
import CountriesDropdownSelect from '../../countries/CountriesDropdownSelect'
import SaveProfileChangesPopUp from '../../popUp/profilePopUps/PopUp.SaveChanges'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import ChildDocumentUploadingBlock from '../childDocument/ChildDocumentUploadingBlock'
import { $myProfile } from '../model'
import EditAvatarBlock from './EditAvatarBlock'
import {
  editProfileCountryModel,
  editProfileFormModel,
  setEditProfileInitialData,
} from './model'

const EditProfileForm = () => {
  const t = useText()
  const myProfile = useStore($myProfile)
  const { styles } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    field: inputThemedStyles,
    common: themedStyles,
  })

  useEffect(() => {
    setEditProfileInitialData().catch(noop)
  }, [])

  const onSaveChanges = () => {
    SaveProfileChangesPopUp.showSync()
  }

  const fieldStyles = { container: styles.common.formItem, ...styles.field }

  return (
    <View style={styles.common.fieldsWrapper}>
      <EditAvatarBlock />
      {editProfileFormModel.mapKeys((name) => {
        if (name === 'birthDate') {
          return (
            <DateField
              offValidation
              key={name}
              label={t.birthDate}
              displayDefaultDate
              formModel={editProfileFormModel}
              name={name}
              style={fieldStyles}
              validateOnBlur
              maximumDate={new Date()}
            />
          )
        }
        return (
          <Field
            key={name}
            label={t[name]}
            validateOnBlur
            placeholder={t[name]}
            formModel={editProfileFormModel}
            name={name}
            style={fieldStyles}
            type={'default'}
          />
        )
      })}
      <CountriesDropdownSelect {...editProfileCountryModel} />
      {!!myProfile?.is_child && (
        <ChildDocumentUploadingBlock
          style={styles.common.uploadDocumentsBlock}
        />
      )}
      <PresetButton
        label={t.save}
        onPress={onSaveChanges}
        preset={styles.buttonPrimary}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    fieldsWrapper: {
      paddingTop: 24,
    },
    formItem: {
      marginBottom: 20,
    },
    uploadDocumentsBlock: {
      marginBottom: 24,
      backgroundColor: colors.formFieldBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
      borderRadius: 20,
    },
    fieldLabel: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: FONT_MEDIUM,
    },
  })
)

export default EditProfileForm
