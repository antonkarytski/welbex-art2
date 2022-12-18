import React from 'react'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type AppHeaderProps = {
  style?: ScreenHeaderStyles
}

const AppHeader = ({ style }: AppHeaderProps) => {
  return <ScreenHeader style={style} title={'ART2'} />
}

export default AppHeader
