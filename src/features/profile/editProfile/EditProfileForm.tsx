import { KeyboardAvoidingView } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import {
  buttonLightThemedPreset,
  buttonPrimaryThemedPreset,
} from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import Field from '../../../ui/form/Field'
import PhoneEnter from '../../auth/PhoneEnter'
import CountriesDropdownSelect from '../../countries/CountriesDropdownSelect'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import {
  PROFILE_FORM_DESCRIPTORS,
  countryModel,
  profileFormModel,
} from './model.editProfile'

const EditProfileForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    dropdownTab: dropdownTabThemedStyles,
    input: inputThemedStyles,
  })

  const onSaveChanges = () => {}

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={commonStyles.fieldsWrapper}
      >
        {PROFILE_FORM_DESCRIPTORS.map((field) => (
          <Field
            key={field.name}
            label={field.label(t)}
            formModel={profileFormModel}
            name={field.name}
            styles={{ ...styles.input, container: commonStyles.formItem }}
          />
        ))}

        <PhoneEnter
          label={t.phoneNumber}
          style={{
            wrapper: commonStyles.formItem,
            input: { label: styles.input.label },
            select: { dropdownTab: styles.dropdownTab },
          }}
        />
        <CountriesDropdownSelect model={countryModel} />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.save}
        onPress={onSaveChanges}
        preset={styles.buttonPrimary}
        style={commonStyles.resultsButton}
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
    tabLabel: {
      fontSize: 20,
    },
  })
)

const commonStyles = StyleSheet.create({
  resultsButton: {
    marginTop: 'auto',
    marginBottom: 12,
  },
  fieldsWrapper: {
    paddingTop: 24,
  },
  formItem: {
    marginBottom: 20,
  },
})

export default EditProfileForm
