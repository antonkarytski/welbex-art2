import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { useColors } from '../themed'
import { ColorThemeStructure } from '../themed/theme'
import InfoMessageButtonBlock from './InfoMessageButtonBlock'
import { InfoMessageScreenVariant } from './types'

type InfoMessageContainerProps = {
  buttonLabel: string
  onButtonPress: () => void
  variant?: InfoMessageScreenVariant
}

function getScreenColor(
  variant: InfoMessageScreenVariant,
  colors: ColorThemeStructure
) {
  switch (variant) {
    case 'light':
      return colors.screenBackground
    case 'primary':
      return colors.primary1
  }
}

const InfoMessageContainer = ({
  variant = 'primary',
  buttonLabel,
  onButtonPress,
  children,
}: PropsWithChildren<InfoMessageContainerProps>) => {
  const colors = useColors()
  const backgroundColor = getScreenColor(variant, colors)

  return (
    <View style={[{ backgroundColor }, styles.container]}>
      <View style={styles.contentContainer}>{children}</View>
      <InfoMessageButtonBlock label={buttonLabel} onPress={onButtonPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default InfoMessageContainer
