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
import IconButton from '../../../ui/buttons/IconButton'
import PresetButton from '../../../ui/buttons/PresetButton'
import Field from '../../../ui/form/Field'
import PlusIcon from '../../../ui/icons/Icon.Plus'
import {
  profileCountryModel,
  profileCountrySearchModel,
} from '../../auth/model.profileCountry'
import PhoneEnter from '../../auth/phoneEnter/PhoneEnter'
import CountriesDropdownSelect from '../../countries/CountriesDropdownSelect'
import UploadFromCameraBlock from '../../imagePick/Block.UploadFromCamera'
import PhotoEditPopUp from '../../popUp/PopUp.PhotoEditActionSelect'
import SaveChangesPopUp from '../../popUp/PopUp.SaveChanges'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { PROFILE_FORM_DESCRIPTORS, profileFormModel } from './model.editProfile'

const EditProfileForm = () => {
  const t = useText()
  const { styles, colors } = useThemedStyleList({
    buttonPrimary: buttonPrimaryThemedPreset,
    buttonLight: buttonLightThemedPreset,
    dropdownTab: dropdownTabThemedStyles,
    input: inputThemedStyles,
    common: themedStyles,
  })

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
        <CountriesDropdownSelect
          model={profileCountryModel}
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
    editProfileButton: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      backgroundColor: colors.lightAccentDetails,
    },
  })
)

export default EditProfileForm
