import React, { ReactNode } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { useThemedStyleList } from '../../../features/themed/hooks'
import AppHeader from '../../../navigation/elements/AppHeader'
import { darkScreenHeaderThemedStyles } from '../../../styles/screen'
import ScreenContainer from '../../../ui/ScreenContainer'
import ScreenWrapper from '../../../ui/ScreenWrapper'
import { themedCommonStyles } from './styles'

type AuthScreenContainerProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
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
    screenHeader: darkScreenHeaderThemedStyles,
    common: themedCommonStyles,
  })

  return (
    <ScreenWrapper style={[styles.common.wrapper, style]}>
      <AppHeader
        style={styles.screenHeader}
        settingsAvailable={false}
        backAvailable={backAvailable}
        backArrowColor={colors.appHeaderIconDark}
      />
      <ScreenContainer
        enableScrollView={enableScrollView}
        style={styles.common.wrapper}
      >
        {children}
      </ScreenContainer>
    </ScreenWrapper>
  )
}
export default AuthScreenContainer
