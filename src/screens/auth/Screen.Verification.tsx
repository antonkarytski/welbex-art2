import React from 'react'
import { useThemedStyleList } from '../../features/themed/hooks'
import AppHeader from '../../navigation/elements/AppHeader'
import ScreenWrapper from '../../ui/ScreenWrapper'
import { themedCommonStyles, themedScreenHeaderStyles } from './styles'

export default function Verification() {
  const { styles } = useThemedStyleList({
    screenHeader: themedScreenHeaderStyles,
    common: themedCommonStyles,
  })
  return (
    <ScreenWrapper style={styles.common.screenWrapper}>
      <AppHeader style={styles.screenHeader} />
    </ScreenWrapper>
  )
}
