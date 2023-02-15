import { useStore } from 'effector-react'
import React from 'react'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import Button from '../../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../../ui/buttons/types'
import { signUpUserDataFormModel } from './model'

type SignUpValidationButtonProps = {
  preset?: PresetButtonStates
}

const UserDataValidationButton = ({ preset }: SignUpValidationButtonProps) => {
  const t = useText()
  const navigate = useNavigate()
  const isFormValid = useStore(signUpUserDataFormModel.validation.$state)

  const onContinueSignUp = () => {
    signUpUserDataFormModel.validation.cast().then(({ isValid }) => {
      if (isValid) navigate(links.countrySelection)
    })
  }

  return (
    <Button
      label={t.continue}
      onPress={onContinueSignUp}
      preset={preset}
      disabled={isFormValid === false}
    />
  )
}

export default UserDataValidationButton
