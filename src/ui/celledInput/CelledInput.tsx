import React from 'react'
import {
  KeyboardType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import {
  CodeField,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'
import { StateModel, useStateStore } from 'altek-toolkit'
import Cell, { CellStyle } from './Cell'
import { TextContentType } from './types'

type CelledInputProps = {
  model: StateModel<string>
  cellCount?: number
  keyboardType?: KeyboardType
  textContentType?: TextContentType
  style?: {
    root?: StyleProp<ViewStyle>
    cell?: CellStyle
  }
}

export default function CelledInput({
  model,
  cellCount = 4,
  keyboardType = 'number-pad',
  textContentType = 'oneTimeCode',
  style,
}: CelledInputProps) {
  const [value, setValue] = useStateStore(model)
  const [, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  return (
    <View style={styles.container}>
      <CodeField
        value={value}
        onChangeText={setValue}
        cellCount={cellCount}
        rootStyle={[styles.codeFieldRoot, style?.root]}
        keyboardType={keyboardType}
        textContentType={textContentType}
        renderCell={({ index, symbol, isFocused }) => (
          <Cell
            style={style?.cell}
            key={index}
            symbol={symbol}
            isFocused={isFocused}
            onLayout={getCellOnLayoutHandler(index)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  codeFieldRoot: {
    width: '100%',
    justifyContent: 'space-around',
  },
})
