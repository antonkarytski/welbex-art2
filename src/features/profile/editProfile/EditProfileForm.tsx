import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import Avatar from '../../../ui/Avatar'
import PresetButton from '../../../ui/buttons/PresetButton'
import Field from '../../../ui/form/Field'
import PhoneEnter from '../../auth/PhoneEnter'
import CountriesDropdownSelect from '../../countries/CountriesDropdownSelect'
import UploadFromCameraBlock from '../../imagePick/Block.UploadFromCamera'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import {
  PROFILE_FORM_DESCRIPTORS,
  countryModel,
  profileFormModel,
} from './model.editProfile'

const EditProfileForm = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    dropdownTab: dropdownTabThemedStyles,
    input: inputThemedStyles,
    common: themedStyles,
  })

  const onSaveChanges = () => {}

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.fieldsWrapper}
      >
        <Avatar
          size={112}
          onAddPhoto={() => {}}
          style={styles.common.avatar}
          actionColors={{
            icon: colors.whiteText,
            button: colors.lightAccentDetails,
          }}
        />
        {PROFILE_FORM_DESCRIPTORS.map((field) => (
          <Field
            key={field.name}
            label={field.label(t)}
            formModel={profileFormModel}
            name={field.name}
            styles={{ ...styles.input, container: styles.common.formItem }}
          />
        ))}

        <PhoneEnter
          label={t.phoneNumber}
          style={{
            wrapper: styles.common.formItem,
            input: { label: styles.input.label },
            select: { dropdownTab: styles.dropdownTab },
          }}
        />
        <CountriesDropdownSelect model={countryModel} />
        <UploadFromCameraBlock
          label={t.uploadChildDocument}
          style={styles.common.uploadDocumentsBlock}
        />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.save}
        onPress={onSaveChanges}
        preset={styles.buttonPrimary}
        style={styles.common.resultsButton}
      />
    </>
  )
}

const dropdownTabThemedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    label: {
      color: colors.textGrey,
      fontSize: 14,
      lineHeight: 20,
    },
  })
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    avatar: { marginBottom: 32, marginLeft: 'auto', marginRight: 'auto' },
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
    resultsButton: {
      marginTop: 'auto',
      marginBottom: 12,
    },
  })
)

export default EditProfileForm
