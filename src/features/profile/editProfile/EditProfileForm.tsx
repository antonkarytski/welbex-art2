import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
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
import ChildDocumentUploadingBlock from '../../createPost/ChildDocumentUploadingBlock'
import PhoneEnter from '../../phoneEnter/PhoneEnter'
import SaveChangesPopUp from '../../popUp/profilePopUps/PopUp.SaveChanges'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import EditAvatarBlock from './EditAvatarBlock'
import {
  editProfileCountryModel,
  editProfileFormModel,
  editProfilePhoneModel,
} from './model'

const EditProfileForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    field: inputThemedStyles,
    common: themedStyles,
  })

  const onSaveChanges = () => {
    SaveChangesPopUp.showSync()
  }

  const fieldStyles = { container: styles.common.formItem, ...styles.field }

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.fieldsWrapper}
      >
        <EditAvatarBlock />
        {editProfileFormModel.mapKeys((name) => {
          if (name === 'birthDate') {
            return (
              <DateField
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
        <PhoneEnter
          model={editProfilePhoneModel}
          label={t.phoneNumber}
          style={{
            wrapper: styles.common.formItem,
            input: { label: styles.common.fieldLabel },
          }}
        />
        <CountriesDropdownSelect model={editProfileCountryModel} />
        <ChildDocumentUploadingBlock
          style={styles.common.uploadDocumentsBlock}
        />
        <PresetButton
          label={t.save}
          onPress={onSaveChanges}
          preset={styles.buttonPrimary}
        />
      </KeyboardAvoidingView>
    </>
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
