import { useStore } from 'effector-react'
import React from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { PhoneInputModel } from '../../lib/componentsModels/phoneNumber/model.phoneNumber'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { useText } from '../../translations/hook'
import { FnExt } from '../../types'
import PresetButton from '../../ui/buttons/PresetButton'
import { PresetButtonStates } from '../../ui/buttons/types'

type SendPhoneButtonProps = {
  buttonPreset: PresetButtonStates
  setIsPressedToContinue: FnExt<boolean>
  phoneInputModel: PhoneInputModel
}

const SendPhoneButton = ({
  buttonPreset,
  setIsPressedToContinue,
  phoneInputModel,
}: SendPhoneButtonProps) => {
  const navigate = useNavigate()
  const t = useText()

  const [phoneNumber] = useStateStore(phoneInputModel.purePhoneModel)
  const isPhoneValid = useStore(phoneInputModel.$isPhoneValid)

  const onContinue = () => {
    if (!isPhoneValid) {
      setIsPressedToContinue(true)
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
      disabled={!phoneNumber}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    marginTop: 'auto',
  },
})

export default SendPhoneButton
