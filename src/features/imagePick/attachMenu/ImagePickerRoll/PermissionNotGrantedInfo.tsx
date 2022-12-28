import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { permissionsForceRequest } from '../../../../lib/permissions/permission.mediaLibrary'
import { useText } from '../../../../translations/hook'
import Span from '../../../../ui/Span'
import { createThemedStyle } from '../../../themed'
import { useThemedStyle } from '../../../themed/hooks'

type PermissionNotGrantedInfoProps = {}

const PermissionNotGrantedInfo = ({}: PermissionNotGrantedInfoProps) => {
  const text = useText()
  const styles = useThemedStyle(themedStyles)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={permissionsForceRequest}>
        <Span label={'GRANT'} style={styles.text} />
        <Span weight={600} label={'TAB HERE'} style={styles.text} />
      </TouchableOpacity>
    </View>
  )
}

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      height: 350,
      paddingTop: 30,
      alignItems: 'center',
      textAlign: 'center',
    },
    text: {
      textAlign: 'center',
      fontSize: 18,
      color: colors.text,
    },
  })
)

export default PermissionNotGrantedInfo
