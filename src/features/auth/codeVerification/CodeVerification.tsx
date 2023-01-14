import React, { useEffect } from 'react'
import { useStateStore } from 'altek-toolkit'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import CelledInput from '../../../ui/celledInput/CelledInput'
import { codeModel, isCodeValidModel } from './model.codeVerification'

const CodeVerification = () => {
  const navigate = useNavigate()
  const [isCodeValid] = useStateStore(isCodeValidModel)

  useEffect(() => {
    if (isCodeValid) {
      navigate(links.createPassword)
    }
  }, [isCodeValid, navigate])

  return <CelledInput model={codeModel} />
}

export default CodeVerification
