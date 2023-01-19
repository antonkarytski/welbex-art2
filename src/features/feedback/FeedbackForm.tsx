import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import { useThemedStyleList } from '../themed/hooks'
import { feedbackFormModel } from './feedback.model'

const FeedbackForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })

  const fieldStyles = {
    ...styles.field,
    wrapper: { ...styles.field.wrapper, ...featureStyles.field_wrapper },
  }

  const onSendFeedback = () => {}

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : 'height'}
      style={featureStyles.formWrapper}
    >
      <Field
        label={t.email}
        formModel={feedbackFormModel}
        name={feedbackFormModel.fields.email}
        style={fieldStyles}
      />
      <Field
        label={t.name}
        formModel={feedbackFormModel}
        name={feedbackFormModel.fields.name}
        style={fieldStyles}
      />
      <Field
        label={t.questionSubject}
        placeholder={t.yourQuestion}
        formModel={feedbackFormModel}
        name={feedbackFormModel.fields.question}
        multiline={true}
        style={
          (styles.field,
          { input: { ...styles.field.input, ...featureStyles.textarea } })
        }
      />
      <PresetButton
        label={t.send}
        onPress={onSendFeedback}
        preset={styles.button}
        style={featureStyles.bottomButton}
      />
    </KeyboardAvoidingView>
  )
}

const featureStyles = StyleSheet.create({
  formWrapper: {
    flexGrow: 1,
    marginTop: 24,
  },
  bottomButton: {
    marginTop: 'auto',
  },
  textarea: {
    height: 120,
    paddingVertical: 16,
  },
  field_wrapper: {
    marginBottom: 20,
  },
})

export default FeedbackForm
