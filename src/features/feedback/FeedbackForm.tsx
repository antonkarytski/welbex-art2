import { useStoreMap } from 'effector-react'
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
import UploadFilesBlock from './UploadFilesBlock'
import { FEEDBACK_CATEGORY } from './categories'
import { feedbackCategoryModel, feedbackFormModel } from './feedback.model'
import { sendFeedback } from './request'

const FeedbackForm = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })
  const stylesPreset = useDropdownSelectPreset()

  const isSendButtonDisabled = useStoreMap({
    store: feedbackFormModel.$store,
    keys: [],
    fn: (fields) => !fields.message,
  })

  const onSendFeedback = () => {
    sendFeedback()
  }

  const fieldStyles = useMergedStyles([
    styles.field,
    inputStyle,
    { container: commonStyles.field_wrapper },
  ])

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
          name={feedbackFormModel.fields.message}
          multiline={true}
          style={fieldStyles}
        />
        <UploadFilesBlock />
      </KeyboardAvoidingView>
      <PresetButton
        label={t.send}
        onPress={onSendFeedback}
        preset={styles.button}
        style={commonStyles.bottomButton}
        disabled={isSendButtonDisabled}
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
    marginVertical: 24,
  },
  bottomButton: {
    marginTop: 'auto',
  },
  field_wrapper: {
    marginBottom: 20,
  },
})

export default FeedbackForm
