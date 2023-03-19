import { useStore } from 'effector-react'
import React from 'react'
import { links } from '../../../navigation/links'
import UserDataSignUpForm from '../../signUp/userData/UserDataSignUpForm'
import { validateAbsentUserData } from './helpers'
import { getApiKeyByFormName } from './helpers.converter'
import { useQuickAuthNextStep } from './hooks'
import { $quickAuthAbsentFields } from './model'

const QuickAuthUserDataForm = () => {
  const quickAuthFilter = useStore($quickAuthAbsentFields)
  const nextStep = useQuickAuthNextStep(links.authSubmit)

  if (!quickAuthFilter) return null

  return (
    <UserDataSignUpForm
      title={(t) => t.completeRegistration}
      fieldsFilter={(key) => !!quickAuthFilter[getApiKeyByFormName(key)]}
      fieldsValidationFilter={(validation) =>
        validateAbsentUserData(quickAuthFilter, validation)
      }
      nextStep={nextStep}
    />
  )
}

export default QuickAuthUserDataForm
