import React from 'react'
import { buttonLightThemedPreset } from '../../../styles/buttons'
import { useText } from '../../../translations/hook'
import BigIconButton from '../../../ui/buttons/BigIconButton'
import { BigIconButtonStyles } from '../../../ui/buttons/types'
import OutComingArrowIcon from '../../../ui/icons/Icon.OutcomingArrow'
import LogOutPopUp from '../../popUp/authPopUps/PopUp.LogOut'
import { useThemedStyleList } from '../../themed/hooks'

const LogoutButton = ({ style }: { style: BigIconButtonStyles }) => {
  const t = useText()
  const { styles } = useThemedStyleList({ button: buttonLightThemedPreset })

  const onLogout = () => {
    LogOutPopUp.showSync()
  }

  return (
    <BigIconButton
      label={t.logOut}
      onPress={onLogout}
      style={style}
      preset={styles.button}
    >
      <OutComingArrowIcon size={24} style={style?.icon} />
    </BigIconButton>
  )
}

export default LogoutButton
