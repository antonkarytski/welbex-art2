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
import ScreenWrapper from '../../../ui/ScreenWrapper'
import { themedCommonStyles, themedScreenHeaderStyles } from './styles'

type AuthScreenContainerProps = {
  children: ReactNode | ReactNode[]
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
        <ScreenWrapper style={[styles.common.screenWrapper, style]}>
          <AppHeader
            style={styles.screenHeader}
            backAvailable={backAvailable}
            backArrowColor={colors.appHeaderIconDark}
          />
          {children}
        </ScreenWrapper>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default AuthScreenContainer
