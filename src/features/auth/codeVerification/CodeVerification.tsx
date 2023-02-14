import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { useStateStore } from 'altek-toolkit'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { cellThemedStyles } from '../../../styles/inputs'
import CelledInput from '../../../ui/celledInput/CelledInput'
import { useThemedStyle } from '../../themed/hooks'
import { codeModel, isCodeValidModel } from './model'

const CodeVerification = () => {
  const navigate = useNavigate()
  const [isCodeValid] = useStateStore(isCodeValidModel)
  const cellStyles = useThemedStyle(cellThemedStyles)

  useEffect(() => {
    if (isCodeValid) {
      navigate(links.createPassword)
    }
  }, [isCodeValid, navigate])

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
