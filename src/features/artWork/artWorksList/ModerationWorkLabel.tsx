import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../../translations/hook'
import Span from '../../../ui/Span'
import RefreshIcon from '../../../ui/icons/Icon.Refresh'
import RefreshReverseIcon from '../../../ui/icons/Icon.RefreshReverse'
import { createThemedStyle } from '../../themed'
import { useTheme, useThemedStyle } from '../../themed/hooks'

type ModerationWorkLabelProps = {}

const ModerationWorkLabel = ({}: ModerationWorkLabelProps) => {
  const t = useText()
  const { styles, colors } = useTheme(themedStyles)

  return (
    <View style={styles.container}>
      <RefreshReverseIcon color={colors.whiteText} />
      <Span weight={600} style={styles.label} label={t.moderationWork} />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.primary2,
      height: 35,
      position: 'absolute',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 0,
      flexDirection: 'row',
    },
    label: {
      color: colors.whiteText,
      fontSize: 12,
      marginLeft: 5,
    },
  })
)

export default ModerationWorkLabel
