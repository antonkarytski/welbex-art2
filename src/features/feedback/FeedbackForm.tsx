import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import Field from '../../ui/form/Field'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { useThemedStyleList } from '../themed/hooks'
import { useMergedStyles } from '../themed/hooks.merge'
import UploadImagesBlock from './UploadImagesBlock'
import { FEEDBACK_CATEGORY } from './categories'
import { feedbackCategoryModel, feedbackFormModel } from './feedback.model'

const FeedbackForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })
  const stylesPreset = useDropdownSelectPreset()

  const onSendFeedback = () => {}

  const fieldStyles = useMergedStyles([styles.field, inputStyle])

  return (
    <>
      <KeyboardAvoidingView
        behavior={IS_IOS ? 'padding' : 'height'}
        style={commonStyles.formWrapper}
      >
        <DropdownSelect
          data={FEEDBACK_CATEGORY}
          idExtractor={({ id }) => id.toString()}
          labelExtractor={({ label }) => label(t)}
          label={t.feedbackForm.selectIssue}
          model={feedbackCategoryModel}
          preset={stylesPreset}
          style={{
            dropdownTab: {
              tab: commonStyles.field_wrapper,
            },
          }}
        />
        <Field
          label={t.feedbackForm.describeSubject}
          placeholder={t.feedbackForm.yourMessage}
          formModel={feedbackFormModel}
          name={feedbackFormModel.fields.question}
          multiline={true}
          style={fieldStyles}
        />
        <UploadImagesBlock />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.send}
        onPress={onSendFeedback}
        preset={styles.button}
        style={commonStyles.bottomButton}
      />
    </>
  )
}

const inputStyle = StyleSheet.create({
  input: {
    height: 120,
    paddingTop: 16,
    textAlignVertical: 'top',
  },
})

const commonStyles = StyleSheet.create({
  formWrapper: {
    marginTop: 24,
  },
  bottomButton: {
    marginTop: 'auto',
  },
  field_wrapper: {
    marginBottom: 20,
  },
})

export default FeedbackForm
