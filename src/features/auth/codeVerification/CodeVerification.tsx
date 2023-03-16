import { useStore } from 'effector-react'
import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { noop } from '../../../lib/helpers'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { cellThemedStyles } from '../../../styles/inputs'
import CelledInput from '../../../ui/celledInput/CelledInput'
import { useThemedStyle } from '../../themed/hooks'
import { $isOnQuickAuth, saveSignUpPhoneToCompleteData } from '../quick/model'
import { completeQuickAuth } from '../quick/request'
import { codeModel, isCodeValidModel } from './model'

const CodeVerification = () => {
  const navigate = useNavigate()
  const [isCodeValid] = useStateStore(isCodeValidModel)
  const isOnQuickAuth = useStore($isOnQuickAuth)
  const cellStyles = useThemedStyle(cellThemedStyles)

  useEffect(() => {
    if (!isCodeValid) return
    if (isOnQuickAuth) {
      saveSignUpPhoneToCompleteData()
      completeQuickAuth().catch(noop)
      return
    }
    navigate(links.createPassword)
  }, [isCodeValid, isOnQuickAuth, navigate])

  return (
    <CelledInput
      model={codeModel}
      style={{ cell: cellStyles, root: styles.root }}
    />
  )
}

const styles = StyleSheet.create({
  root: { marginBottom: 30 },
})

export default CodeVerification
