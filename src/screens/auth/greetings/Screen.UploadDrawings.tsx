import React, { useCallback, useMemo } from 'react'
import { Dimensions, Image, View } from 'react-native'
import { useThemedStyleList } from '../../../features/themed/hooks'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import PresetButton from '../../../ui/buttons/PresetButton'
import AuthScreenContainer from '../stylePresets/AuthScreenContainer'
import { themedGreetingsStyles } from './styles'

const UploadDrawingsScreen = () => {
  const t = useText()
  const navigate = useNavigate()
  const { styles } = useThemedStyleList({
    common: themedGreetingsStyles,
    button: buttonPrimaryThemedPreset,
  })

  return (
    <AuthScreenContainer>
      <PresetButton
        label={t.next}
        onPress={() => {
          navigate(links.greetingGetRewards)
        }}
        preset={styles.button}
        style={styles.common.button}
      />
    </AuthScreenContainer>
  )
}

export default UploadDrawingsScreen
