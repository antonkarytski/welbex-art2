import React from 'react'
import { inputThemedStyles } from '../../../styles/inputs'
import { useText } from '../../../translations/hook'
import { Field } from '../../../ui/form'
import { useThemedStyleList } from '../../themed/hooks'
import { recoverPasswordFormModel } from './model.recoverPassword'

const RecoverPasswordForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
  })

  return (
    <Field
      placeholder={t.email}
      formModel={recoverPasswordFormModel}
      name={recoverPasswordFormModel.fields.email}
      style={styles.field}
    />
  )
}

export default RecoverPasswordForm
