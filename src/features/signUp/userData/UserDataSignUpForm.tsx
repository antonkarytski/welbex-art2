import React from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { themedCommonStyles } from '../../../screens/auth/stylePresets/styles'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import H2 from '../../../ui/H2'
import Field from '../../../ui/form/Field'
import { useThemedStyleList } from '../../themed/hooks'
import UserDataValidationButton, {
  FieldValidationFilter,
} from './UserDataValidationButton'
import { signUpUserDataFormModel } from './model'
import { SignUpUserDataForm } from './types'

type UserDataSignUpFormProps = {
  title?: string | LangFn
  fieldsFilter?: (key: keyof SignUpUserDataForm) => boolean
  fieldsValidationFilter?: FieldValidationFilter
  nextStep?: () => void
}

const UserDataSignUpForm = React.memo(
  ({
    fieldsFilter,
    title: extTitle,
    ...submitProps
  }: UserDataSignUpFormProps) => {
    const t = useText()
    const { styles } = useThemedStyleList({
      field: inputThemedStyles,
      button: buttonPrimaryThemedPreset,
      screen: themedCommonStyles,
    })
    const title = typeof extTitle === 'function' ? extTitle(t) : extTitle

    return (
      <>
        <KeyboardAvoidingView behavior={IS_IOS ? 'padding' : undefined}>
          <H2 label={title || t.createNewAccount} style={styles.screen.title} />
          {signUpUserDataFormModel.mapKeys((name) => {
            if (fieldsFilter && !fieldsFilter(name)) {
              return null
            }
            return (
              <Field
                validateOnBlur
                key={name}
                placeholder={t[name]}
                formModel={signUpUserDataFormModel}
                name={name}
                style={styles.field}
                type={name === 'email' ? 'email-address' : 'default'}
              />
            )
          })}
        </KeyboardAvoidingView>
        <UserDataValidationButton preset={styles.button} {...submitProps} />
      </>
    )
  }
)

export default UserDataSignUpForm
