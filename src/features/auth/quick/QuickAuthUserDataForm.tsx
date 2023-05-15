import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { IS_IOS } from '../../../lib/helpers/native/constants'
import UserDataSignUpForm from '../../signUp/userData/UserDataSignUpForm'
import { signUpUserDataFormModel } from '../../signUp/userData/model'
import { iosFilter, validateAbsentUserData } from './helpers'
import { getApiKeyByFormName } from './helpers.converter'
import { $quickAuthAbsentFields } from './model'

type QuickAuthUserDataFormProps = {
  nextStep: () => void
}

const QuickAuthUserDataForm = ({ nextStep }: QuickAuthUserDataFormProps) => {
  const quickAuthFilter = useStore($quickAuthAbsentFields)

  useEffect(() => {
    if (!IS_IOS || !quickAuthFilter) return
    for (let key in quickAuthFilter) {
      if (key === 'first_name') {
        signUpUserDataFormModel.setField({
          key: 'name',
          value: 'John',
        })
      }
      if (key === 'last_name') {
        signUpUserDataFormModel.setField({
          key: 'lastName',
          value: 'Doe',
        })
      }
    }
  }, [quickAuthFilter])

  if (!quickAuthFilter) return null

  return (
    <UserDataSignUpForm
      title={(t) => t.completeRegistration}
      fieldsFilter={(key) => {
        const filterKey = getApiKeyByFormName(key)
        return (
          !!quickAuthFilter[getApiKeyByFormName(key)] &&
          (!IS_IOS || iosFilter(filterKey))
        )
      }}
      fieldsValidationFilter={(validation) =>
        validateAbsentUserData(quickAuthFilter, validation)
      }
      nextStep={nextStep}
    />
  )
}

export default QuickAuthUserDataForm
