import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { useThemedStyleList } from '../themed/hooks'
import { FEEDBACK_CATEGORY } from './categories'
import { feedbackCategoryModel, feedbackFormModel } from './feedback.model'

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
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={featureStyles.formWrapper}
      >
        <DropdownSelect
          data={FEEDBACK_CATEGORY}
          idExtractor={({ id }) => id.toString()}
          labelExtractor={({ label }) => label(t)}
          label={t.feedbackForm.selectIssue}
          model={feedbackCategoryModel}
          style={{
            dropdownTab: {
              tab: featureStyles.field_wrapper,
            },
          }}
        />
        <Field
          label={t.feedbackForm.describeSubject}
          placeholder={t.feedbackForm.yourMessage}
          formModel={feedbackFormModel}
          name={feedbackFormModel.fields.question}
          multiline={true}
          style={{
            ...styles.field,
            input: { ...styles.field.input, ...featureStyles.textarea },
          }}
        />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.send}
        onPress={onSendFeedback}
        preset={styles.button}
        style={featureStyles.bottomButton}
      />
    </>
  )
}

const featureStyles = StyleSheet.create({
  formWrapper: {
    marginTop: 24,
  },
  bottomButton: {
    marginTop: 'auto',
  },
  textarea: {
    height: 120,
    paddingVertical: 16,
    textAlignVertical: 'top',
  },
  field_wrapper: {
    marginBottom: 20,
  },
})

export default FeedbackForm
