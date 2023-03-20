import { useStore } from 'effector-react'
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
import Avatar from '../../../ui/Avatar'
import IconButton from '../../../ui/buttons/IconButton'
import PresetButton from '../../../ui/buttons/PresetButton'
import DateField from '../../../ui/form/DateField'
import Field from '../../../ui/form/Field'
import PlusIcon from '../../../ui/icons/Icon.Plus'
import { profileCountrySearchModel } from '../../auth/model.profileCountry'
import CountriesDropdownSelect from '../../countries/CountriesDropdownSelect'
import UploadFromCameraBlock from '../../imagePick/Block.UploadFromCamera'
import PhoneEnter from '../../phoneEnter/PhoneEnter'
import PhotoEditPopUp from '../../popUp/PopUp.PhotoEditActionSelect'
import SaveChangesPopUp from '../../popUp/PopUp.SaveChanges'
import { signUpCountryModel } from '../../signUp/country/model'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { $myProfile } from '../model'
import { editProfileFormModel, profilePhoneModel } from './model.editProfile'

const EditProfileForm = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    field: inputThemedStyles,
    common: themedStyles,
  })

  const myProfile = useStore($myProfile)
  console.log('myProfile', myProfile)

  const onSaveChanges = () => {
    SaveChangesPopUp.showSync()
  }

  const onEditPhoto = () => {
    PhotoEditPopUp.showSync()
  }
  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={styles.common.fieldsWrapper}
      >
        <Avatar size={112} style={styles.common.avatar}>
          <IconButton
            Icon={PlusIcon}
            onPress={onEditPhoto}
            iconColor={colors.whiteText}
            style={styles.common.editProfileButton}
          />
        </Avatar>
        {editProfileFormModel.mapKeys((name) => {
          if (name === 'birthDate') {
            return (
              <DateField
                key={name}
                label={t.birthDate}
                placeholder={t.birthDate}
                formModel={editProfileFormModel}
                name={name}
                style={styles.field}
                validateOnBlur
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
              style={styles.field}
              type={'default'}
            />
          )
        })}
        <PhoneEnter
          model={profilePhoneModel}
          label={t.phoneNumber}
          style={{
            wrapper: styles.common.formItem,
            input: { label: styles.common.fieldLabel },
          }}
        />
        <CountriesDropdownSelect
          model={signUpCountryModel}
          searchModel={profileCountrySearchModel}
        />
        <UploadFromCameraBlock
          label={t.uploadChildDocument}
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
    editProfileButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.lightAccentDetails,
    },
    fieldLabel: {
      fontSize: 14,
      lineHeight: 20,
      fontFamily: FONT_MEDIUM,
    },
  })
)

export default EditProfileForm
