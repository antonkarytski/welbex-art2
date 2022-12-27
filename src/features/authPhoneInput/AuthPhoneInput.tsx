import { useStore } from 'effector-react'
import React, { useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
// import { MaterialIndicator } from 'react-native-indicators'
import { useStateStore } from 'altek-toolkit'
import { COUNTRIES } from '../../_mock/countries'
// import { ErrorIcon, Text } from 'altek-ui'
//////
// import { GRAY } from '../../styles/colors'
import Span from '../../ui/Span'
import Input from '../../ui/input'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import { authPhoneInputModel } from './model'
import { phoneValidateFailedModel } from './model.phoneValidateError'

type NumberInputProps = {
  onLoading?: boolean
}

const AuthPhoneInput = React.memo(({ onLoading }: NumberInputProps) => {
  const [value, setValue] = useStateStore(authPhoneInputModel)
  const isNumberValidateFailed = useStore(phoneValidateFailedModel.$state)
  const inputRef = useRef<TextInput>(null)
  const styles = useThemedStyle(themedStyles)

  return (
    // <TouchableOpacity
    //   activeOpacity={0.9}
    //   style={styles.container}
    //   onPress={() => inputRef.current?.focus()}
    // >
    //   <Span style={[styles.plus, !!value && styles.selected]} label={'+'} />
    //   <Input
    //     ref={inputRef}
    //     style={styles.input}
    //     onChangeText={setValue}
    //     //placeholder="1 999 999 9999"
    //     value={value}
    //   />
    //   {onLoading || isNumberValidateFailed ? (
    //     <View style={{ transform: [{ translateX: -33 }] }}>
    //       {onLoading ? (
    //         // <MaterialIndicator color={GRAY.COMMON} size={14} />
    //         <Span>...</Span>
    //       ) : (
    //         <Span>error</Span>
    //       )}
    //     </View>
    //   ) : null}
    // </TouchableOpacity>
    <View>
      <TouchableOpacity activeOpacity={0.7}>
        <Input
          ref={inputRef}
          style={styles.input}
          onChangeText={setValue}
          //placeholder="+7 ( ___ ) ___ - __ - __"
          value={value}
        />
      </TouchableOpacity>
      <Input
        ref={inputRef}
        style={styles.input}
        onChangeText={setValue}
        //placeholder="+7 ( ___ ) ___ - __ - __"
        value={value}
      />
    </View>
  )
})

export default AuthPhoneInput

const themedStyles = createThemedStyle((colors) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: 15,
      borderColor: '#grey',
      borderWidth: 1,
      borderRadius: 10,
    },
    input: {
      paddingLeft: 0,
      borderBottomWidth: 0,
    },
    plus: {
      color: colors.textGrey,
    },
    selected: {
      color: colors.text,
    },
  })
})
