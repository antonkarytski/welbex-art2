import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../../ui/buttons/types'
import { phoneInputModel } from './model.phone'

type SendPhoneButtonProps = {
  buttonPreset: PresetButtonStates
}

const SendPhoneButton = ({ buttonPreset }: SendPhoneButtonProps) => {
  const navigate = useNavigate()
  const t = useText()

  const isPhoneValid = useStore(phoneInputModel.$isPhoneValid)

  const onContinue = () => {
    if (!isPhoneValid) {
      return
    }
    navigate(links.verification)
  }

  return (
    <PresetButton
      label={t.send}
      onPress={onContinue}
      preset={buttonPreset}
      style={styles.button}
      disabled={!isPhoneValid}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
  },
})

export default SendPhoneButton
