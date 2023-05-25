import { useStore } from 'effector-react'
import moment from 'moment'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { buttonCommonThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import DataRow from '../../../ui/DataRow'
import PresetButton from '../../../ui/buttons/PresetButton'
import { InfoMessageType } from '../../infoMessage/types'
import { $currentSubscription } from '../../profile/model'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

type CurrentSubscriptionContentProps = {}

const CurrentSubscriptionContent = ({}: CurrentSubscriptionContentProps) => {
  const navigate = useNavigate()
  const currentSubscription = useStore($currentSubscription)
  const text = useText()
  const { styles } = useThemedStyleList({
    buttonPreset: buttonCommonThemedPreset,
    common: themedStyles,
  })

  if (!currentSubscription) return null

  return (
    <View style={styles.common.container}>
      <DataRow
        textStyle={styles.common.text}
        title={`${text.subscriptionEndDate}:`}
        value={moment(currentSubscription.expiresIn).format('DD.MM.YYYY')}
      />
      <PresetButton
        preset={styles.buttonPreset}
        style={styles.common.button}
        label={text.unsubscribe}
        onPress={() =>
          navigate(links.infoMessage, { type: InfoMessageType.SIGNED_OFF })
        }
      />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    button: {
      marginTop: 'auto',
    },
    container: {
      paddingHorizontal: 20,
      paddingTop: 24,
      flex: 1,
    },
    text: {
      color: colors.text,
    },
  })
)

export default CurrentSubscriptionContent
