import { combine } from 'effector'
import { useStore, useStoreMap } from 'effector-react'
import React from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../styles/buttons'
import { inputThemedStyles } from '../../styles/inputs'
import { useDropdownSelectPreset } from '../../styles/selects'
import { useText } from '../../translations/hook'
import AsyncPresetButton from '../../ui/buttons/AsyncPresetButton'
import Field from '../../ui/form/Field'
import DropdownSelect from '../../ui/selects/DropdownSelect'
import { InfoMessageType } from '../infoMessage/types'
import { useThemedStyleList } from '../themed/hooks'
import { useMergedStyles } from '../themed/hooks.merge'
import UploadFilesBlock from './UploadFilesBlock'
import { FEEDBACK_CATEGORY } from './categories'
import { feedbackCategoryModel, feedbackFormModel } from './feedback.model'
import { sendFeedback } from './request'

const FeedbackForm = () => {
  const t = useText()
  const navigate = useNavigate()
  const { styles, colors } = useThemedStyleList({
    field: inputThemedStyles,
    button: buttonPrimaryThemedPreset,
  })
  const stylesPreset = useDropdownSelectPreset()

  const isLoading = useStore(sendFeedback.pending)

  const isSendButtonDisabled = useStoreMap({
    store: combine({
      form: feedbackFormModel.$store,
      validation: feedbackFormModel.validation.$fields,
    }),
    keys: [],
    fn: ({ form, validation }) =>
      !form.message || validation.message?.isValid === false,
  })

  const onSendFeedback = () => {
    sendFeedback().then(() => {
      navigate(links.infoMessage, { type: InfoMessageType.FEEDBACK_SUCCESS })
    })
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
          validateOnBlur
        />
        <UploadFilesBlock />
      </KeyboardAvoidingView>
      <AsyncPresetButton
        isLoading={isLoading}
        label={t.send}
        onPress={onSendFeedback}
        preset={styles.button}
        style={commonStyles.bottomButton}
        disabled={isSendButtonDisabled}
        loaderColor={colors.whiteText}
      />
    </>
  )
}

const inputStyle = StyleSheet.create({
  input: {
    minHeight: 120,
    maxHeight: 420,
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
