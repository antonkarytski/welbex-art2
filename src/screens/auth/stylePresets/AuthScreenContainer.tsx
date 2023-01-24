import React, { ReactNode } from 'react'
import {
  Keyboard,
  StyleProp,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native'
import { useThemedStyleList } from '../../../features/themed/hooks'
import AppHeader from '../../../navigation/elements/AppHeader'
import ScreenContainer from '../../../ui/ScreenContainer'
import ScreenWrapper from '../../../ui/ScreenWrapper'
import { themedCommonStyles, themedScreenHeaderStyles } from './styles'

type AuthScreenContainerProps = {
  children: ReactNode
  style?: StyleProp<ViewStyle>
  backAvailable?: boolean
}

const AuthScreenContainer = ({
  children,
  style,
  backAvailable = true,
}: AuthScreenContainerProps) => {
  const { styles, colors } = useThemedStyleList({
    screenHeader: themedScreenHeaderStyles,
    common: themedCommonStyles,
  })

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <ScreenWrapper style={[styles.common.wrapper, style]}>
          <AppHeader
            style={styles.screenHeader}
            settingsAvailable={false}
            backAvailable={backAvailable}
            backArrowColor={colors.appHeaderIconDark}
          />
          <ScreenContainer style={styles.common.wrapper}>
            {children}
          </ScreenContainer>
        </ScreenWrapper>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default AuthScreenContainer
