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
import { useMergedStyles } from '../../themed/hooks.merge'
import ChildDocumentUploadingBlock from '../../user/childDocument/ChildDocumentUploadingBlock'
import EditAvatarBlock from './EditAvatarBlock'
import PhonePreview from './PhonePreview'
import {
  editProfileCountryModel,
  editProfileFormModel,
  setEditProfileInitialData,
} from './model'

const EditProfileForm = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
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

  const inputStyles = useMergedStyles([styles.field, fieldStyles])

  return (
    <View style={styles.common.fieldsWrapper}>
      <EditAvatarBlock />
      {editProfileFormModel.mapKeys((name) => {
        if (name === 'birthDate') {
          return (
            <DateField
              disabled
              offValidation
              key={name}
              label={t.birthDate}
              formModel={editProfileFormModel}
              name={name}
              style={inputStyles}
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
            style={inputStyles}
            type={'default'}
          />
        )
      })}
      <PhonePreview style={styles.common.formItem} colors={colors} />
      <CountriesDropdownSelect {...editProfileCountryModel} />
      <ChildDocumentUploadingBlock
        backgroundColor={colors.formFieldBackground}
        style={styles.common.uploadDocumentsBlock}
      />
      <PresetButton
        label={t.save}
        onPress={onSaveChanges}
        preset={styles.buttonPrimary}
        style={styles.common.submitButton}
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
      backgroundColor: colors.formFieldBackground,
      borderColor: colors.inputBorder,
      borderWidth: 1,
    },
    fieldLabel: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: FONT_MEDIUM,
    },
    submitButton: {
      marginTop: 24,
    },
  })
)

const fieldStyles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  wrapper: {
    marginBottom: 0,
  },
  input: {
    height: 52,
  },
})

export default EditProfileForm
