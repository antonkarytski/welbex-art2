import React, { PropsWithChildren } from 'react'
import { StyleSheet, View } from 'react-native'
import { IS_IOS } from '../../lib/helpers/native/constants'
import { themedPrimaryGradient } from '../../styles/gradients'
import Gradient from '../../ui/gradients/Gradient'
import { useColors } from '../themed'
import { useThemedStyleList } from '../themed/hooks'
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

const ContainerContent = ({
  buttonLabel,
  children,
  onButtonPress,
}: PropsWithChildren<Omit<InfoMessageContainerProps, 'variant'>>) => {
  return (
    <>
      <View style={commonStyles.contentContainer}>{children}</View>
      <InfoMessageButtonBlock label={buttonLabel} onPress={onButtonPress} />
    </>
  )
}

const InfoMessageContainer = ({
  variant = 'primary',
  buttonLabel,
  onButtonPress,
  children,
}: PropsWithChildren<InfoMessageContainerProps>) => {
  const colors = useColors()
  const backgroundColor = getScreenColor(variant, colors)
  const { styles } = useThemedStyleList({ gradient: themedPrimaryGradient })

  if (variant === 'primary') {
    return (
      <Gradient
        colors={styles.gradient}
        startOffset={IS_IOS ? '130%' : undefined}
        stopOffset={IS_IOS ? '160%' : undefined}
        gradientTransform={IS_IOS ? undefined : 'rotate(180)'}
        style={[{ backgroundColor }, commonStyles.container]}
      >
        <ContainerContent
          buttonLabel={buttonLabel}
          onButtonPress={onButtonPress}
        >
          {children}
        </ContainerContent>
      </Gradient>
    )
  }

  return (
    <View style={[{ backgroundColor }, commonStyles.container]}>
      <ContainerContent buttonLabel={buttonLabel} onButtonPress={onButtonPress}>
        {children}
      </ContainerContent>
    </View>
  )
}

const commonStyles = StyleSheet.create({
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
