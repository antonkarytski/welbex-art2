import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { buttonLightThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import Row from '../../../ui/Row'
import Span from '../../../ui/Span'
import PresetButton from '../../../ui/buttons/PresetButton'
import Counter from '../../counter/Counter'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'
import { isTimerExpiredModel } from './model.resendCode'

const ResendCode = () => {
  const t = useText()
  const { styles } = useThemedStyleList({
    button: buttonLightThemedPreset,
    common: themedStyles,
  })

  const [isTimerExpired, setIsTimerExpired] = useStateStore(isTimerExpiredModel)

  const onResendCode = () => {
    // api request
    setIsTimerExpired(false)
  }

  return (
    <View style={styles.common.counterWrapper}>
      {!isTimerExpired && (
        <Row style={styles.common.counterRow}>
          <Span
            label={t.resendCodeTimer}
            style={styles.common.preCounterText}
          />
          <Counter
            onReach={() => setIsTimerExpired(true)}
            startValue={30}
            style={styles.common.counter}
          />
          <Span label={t.secondsAbbreviated} style={styles.common.counter} />
        </Row>
      )}
      <PresetButton
        label={t.resendCode}
        onPress={onResendCode}
        preset={styles.button}
        disabled={!isTimerExpired}
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    counterWrapper: {
      marginTop: 'auto',
    },
    counterRow: {
      marginBottom: 23,
    },
    counter: {
      color: colors.textAccent,
      fontSize: 14,
      fontWeight: '400',
    },
    preCounterText: {
      marginRight: 8,
    },
  })
)

export default ResendCode
