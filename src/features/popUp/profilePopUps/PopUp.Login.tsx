import React from 'react'
import { StyleSheet } from 'react-native'
import { PopUpFactory } from '../../../lib/models/popUp/factory'
import { usePopUpModel } from '../../../lib/models/popUp/hooks'
import PopUpCard from '../../../ui/popUp/PopUpCard'
import OfferToGetAuthorization from '../../auth/OfferToGetAuthorization'

const model = PopUpFactory.createModel()

const PopUpLogin = PopUpFactory.appendModel(() => {
  const popUp = usePopUpModel(model)

  return (
    <PopUpCard style={styles.card} model={model}>
      <OfferToGetAuthorization
        enableDescriptionText
        onLogin={model.hideSync}
        onSignUp={model.hideSync}
      />
    </PopUpCard>
  )
}, model)

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
})

export default PopUpLogin
