import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../translations/hook'
import Span from '../../ui/Span'

const GalleryEmptyComponent = () => {
  // TODO: rework when design will ready
  const t = useText()
  return (
    <View style={styles.container}>
      <Span label={t.noDrawingsYet} style={styles.label} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#616868',
    alignItems: 'center',
  },
})

export default GalleryEmptyComponent
