import React from 'react'
import { StyleSheet, TextStyle, View } from 'react-native'
import { StateModel, useStateStore } from 'altek-toolkit'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'
import CheckBox from '../../ui/checkbox/CheckBox'

type OnlyWinnersFilterProps = {
  model: StateModel<boolean>
  style?: {
    title?: TextStyle
    label?: TextStyle
  }
}

const OnlyWinnersFilter = ({ model, style }: OnlyWinnersFilterProps) => {
  const t = useText()
  const [isSelected, setIsSelected] = useStateStore(model)

  return (
    <View>
      <Span
        weight={500}
        style={[styles.title, style?.title]}
        label={t.artist}
      />
      <View style={styles.container}>
        <CheckBox isSelected={isSelected} onSelect={setIsSelected} />
        <Span
          weight={500}
          style={[styles.label, style?.label]}
          label={t.onlyWinners}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
  },
  title: {
    marginBottom: 12,
  },
})

export default OnlyWinnersFilter
