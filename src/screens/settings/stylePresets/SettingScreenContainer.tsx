import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useThemedStyleList } from '../../../features/themed/hooks'
import ScreenHeader from '../../../navigation/elements/ScreenHeader'
import { darkScreenHeaderThemedStyles } from '../../../styles/screen'
import ScreenContainer from '../../../ui/ScreenContainer'
import ScreenWrapper from '../../../ui/ScreenWrapper'
import { themedCommonStyles } from './styles'

type SettingScreenContainerProps = {
  children: ReactNode
  title: string
  style?: StyleProp<ViewStyle>
  backAvailable?: boolean
}

const SettingScreenContainer = ({
  children,
  title,
  backAvailable = true,
  style,
}: SettingScreenContainerProps) => {
  const { styles, colors } = useThemedStyleList({
    screenHeader: darkScreenHeaderThemedStyles,
    common: themedCommonStyles,
  })

  return (
    <ScreenWrapper style={[styles.common.wrapper, style]}>
      <ScreenHeader
        backAvailable={backAvailable}
        title={title}
        backArrowColor={colors.appHeaderIconDark}
        style={styles.screenHeader}
      />
      <ScreenContainer style={styles.common.wrapper}>
        {children}
      </ScreenContainer>
    </ScreenWrapper>
  )
}

export default SettingScreenContainer
