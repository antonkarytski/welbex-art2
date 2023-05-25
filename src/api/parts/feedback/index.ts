import { ContentType } from '@heyheyjude/toolkit'
import { formDataFromList } from '../../../lib/files/formData'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import { apiManager } from '../../apiManager'
import { CreateFeedbackProps } from './types'

const feedback = apiManager.endpoint('feedback').protect()

const sendEmail = feedback.post<void, CreateFeedbackProps>({
  endpoint: 'send-email',
  contentType: IS_IOS ? ContentType.FORM_ENCODED : ContentType.FORM_DATA,
  fn: (data) => {
    return {
      body: formDataFromList(data),
    }
  },
})

export const feedbackApi = {
  sendEmail,
}
