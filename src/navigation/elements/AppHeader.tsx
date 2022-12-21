import React from 'react'
import Sup from '../../ui/Sup'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type AppHeaderProps = {
  style?: ScreenHeaderStyles
}

const AppHeader = ({ style }: AppHeaderProps) => {
  return (
    <ScreenHeader style={style} title={<Sup label={'ART'} supLabel={'2'} />} />
  )
}

export default AppHeader
