import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { PhoneInputModel } from '../../lib/models/phoneNumber/model.phoneNumber'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import PresetButton from '../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../ui/buttons/types'

type SendPhoneButtonProps = {
  buttonPreset: PresetButtonStates
  onPress?: () => void
  phoneInputModel: PhoneInputModel
}

const SendPhoneButton = ({
  buttonPreset,
  onPress,
  phoneInputModel,
}: SendPhoneButtonProps) => {
  const navigate = useNavigate()
  const t = useText()

  const [phoneNumber] = useStateStore(phoneInputModel.purePhoneModel)
  const isPhoneValid = useStore(phoneInputModel.$isPhoneValid)

  const onContinue = () => {
    onPress?.()
    if (!isPhoneValid) {
      return
    }
    console.log('phoneNumber', phoneNumber)
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
