import React from 'react'
import Sup from '../../ui/Sup'
import ScreenHeader from './ScreenHeader'
import { ScreenHeaderStyles } from './styles'

type AppHeaderProps = {
  style?: ScreenHeaderStyles
  backAvailable?: boolean
}

const AppHeader = ({ style, backAvailable }: AppHeaderProps) => {
  return (
    <ScreenHeader style={style} backAvailable={backAvailable}>
      <Sup style={style?.title} label={'ART'} supLabel={'2'} />
    </ScreenHeader>
  )
}

export default AppHeader
