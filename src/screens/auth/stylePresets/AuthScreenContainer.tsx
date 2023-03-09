import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useThemedStyleList } from '../../../features/themed/hooks'
import AppHeader from '../../../navigation/elements/AppHeader'
import { screenHeaderThemedStylesDark } from '../../../styles/screen'
import ScreenContainer from '../../../ui/ScreenContainer'
import ScreenWrapper from '../../../ui/ScreenWrapper'
import { themedCommonStyles } from './styles'

type AuthScreenContainerProps = {
  children: ReactNode
  style?: {
    screenWrapper?: StyleProp<ViewStyle>
    container?: StyleProp<ViewStyle>
  }
  backAvailable?: boolean
  enableScrollView?: boolean
}

const AuthScreenContainer = ({
  children,
  style,
  backAvailable = true,
  enableScrollView,
}: AuthScreenContainerProps) => {
  const { styles, colors } = useThemedStyleList({
    screenHeader: screenHeaderThemedStylesDark,
    common: themedCommonStyles,
  })

  return (
    <ScreenWrapper style={[styles.common.screenWrapper, style?.screenWrapper]}>
      <AppHeader
        style={styles.screenHeader}
        settingsAvailable={false}
        backAvailable={backAvailable}
        backArrowColor={colors.appHeaderIconDark}
      />
      <ScreenContainer
        enableScrollView={enableScrollView}
        style={[styles.common.screenWrapper, style?.container]}
      >
        {children}
      </ScreenContainer>
    </ScreenWrapper>
  )
}
export default AuthScreenContainer
