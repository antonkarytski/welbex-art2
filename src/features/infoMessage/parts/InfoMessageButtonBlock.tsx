import React from 'react'
import { StyleSheet, View } from 'react-native'
import { buttonPrimaryThemedPreset } from '../../../styles/buttons'
import PresetButton from '../../../ui/buttons/PresetButton'
import { createThemedStyle } from '../../themed'
import { useThemedStyleList } from '../../themed/hooks'

type InfoMessageButtonBlockProps = {
  label: string
  onPress: () => void
}

const InfoMessageButtonBlock = ({
  label,
  onPress,
}: InfoMessageButtonBlockProps) => {
  const { styles } = useThemedStyleList({
    button: buttonPrimaryThemedPreset,
    common: themedStyles,
  })

  return (
    <View style={styles.common.container}>
      <PresetButton preset={styles.button} onPress={onPress} label={label} />
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      paddingBottom: 58,
      paddingTop: 32,
      paddingHorizontal: 20,
      backgroundColor: colors.screenBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  })
)

export default InfoMessageButtonBlock
