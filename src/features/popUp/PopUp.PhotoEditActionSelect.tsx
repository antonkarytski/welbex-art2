import React from 'react'
import { StyleSheet, View } from 'react-native'
import { PopUpFactory } from '../../lib/componentsModels/popUp/factory'
import { usePopUpModel } from '../../lib/componentsModels/popUp/hooks'
import { useText } from '../../translations/hook'
import H2 from '../../ui/H2'
import Span from '../../ui/Span'
import PresetButton from '../../ui/buttons/PresetButton'
import PopUpCard from '../../ui/popUp/PopUpCard'

type PopUpPhotoEditActionSelectProps = {}

const model = PopUpFactory.createModel()

const PopUpPhotoEditActionSelect = PopUpFactory.appendModel(
  ({}: PopUpPhotoEditActionSelectProps) => {
    const text = useText()
    const popUp = usePopUpModel(model)
    if (popUp.props) {
      popUp.props.email
    }

    return (
      <PopUpCard style={styles.card} model={model}>
        <View />
      </PopUpCard>
    )
  },
  model
)

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 12,
    marginBottom: 12,
  },
  button: {
    marginTop: 32,
  },
})

export default PopUpPhotoEditActionSelect
