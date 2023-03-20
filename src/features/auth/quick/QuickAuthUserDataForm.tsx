import { useStore } from 'effector-react'
import React from 'react'
import UserDataSignUpForm from '../../signUp/userData/UserDataSignUpForm'
import { validateAbsentUserData } from './helpers'
import { getApiKeyByFormName } from './helpers.converter'
import { $quickAuthAbsentFields } from './model'

type QuickAuthUserDataFormProps = {
  nextStep: () => void
}

const QuickAuthUserDataForm = ({ nextStep }: QuickAuthUserDataFormProps) => {
  const quickAuthFilter = useStore($quickAuthAbsentFields)

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
