import { useStore, useStoreMap } from 'effector-react'
import React from 'react'
import { ValidationState } from '../../../lib/models/form/types'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import Button from '../../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../../ui/buttons/types'
import { signUpUserDataFormModel } from './model'
import { SignUpUserDataForm } from './types'

export type FieldValidationFilter = (
  fields: Record<keyof SignUpUserDataForm, ValidationState | null>
) => boolean | null
type SignUpValidationButtonProps = {
  preset?: PresetButtonStates
  fieldsValidationFilter?: FieldValidationFilter
  nextStep?: () => void
}

const UserDataValidationButton = ({
  preset,
  nextStep: nextStepExt,
  fieldsValidationFilter,
}: SignUpValidationButtonProps) => {
  const t = useText()
  const navigate = useNavigate()
  const isFieldsValid = useStoreMap({
    store: signUpUserDataFormModel.validation.$fields,
    keys: [fieldsValidationFilter],
    fn: fieldsValidationFilter || (() => true),
  })
  const isFormValid = useStore(signUpUserDataFormModel.validation.$state)
  const nextStep = () => {
    if (nextStepExt) return nextStepExt()
    navigate(links.countrySelection)
  }

  const onContinueSignUp = () => {
    signUpUserDataFormModel.validation.cast().then((validation) => {
      if (
        (!fieldsValidationFilter && validation.isValid) ||
        (fieldsValidationFilter && !fieldsValidationFilter(validation.list))
      ) {
        return nextStep()
      }
    })
  }

  return (
    <Button
      label={t.continue}
      onPress={onContinueSignUp}
      preset={preset}
      disabled={
        fieldsValidationFilter ? isFieldsValid === false : isFormValid === false
      }
    />
  )
}

export default UserDataValidationButton
