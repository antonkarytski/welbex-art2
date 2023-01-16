import React, { useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import EyeIcon from '../icons/Icon.Eye'
import EyeClosedIcon from '../icons/Icon.EyeClosed'
import Field from './Field'
import { SecureFieldProps, ToggleSecureIconProps } from './_types'

const ToggleSecureIcon = ({
  secure,
  setSecure,
  color = '#303535',
  size = 24,
}: ToggleSecureIconProps) => {
  return (
    <TouchableOpacity onPress={() => setSecure(!secure)} activeOpacity={0.6}>
      {secure ? (
        <EyeClosedIcon color={color} size={size} />
      ) : (
        <EyeIcon color={color} size={size} />
      )}
    </TouchableOpacity>
  )
}

const SecureField = <T extends Record<string, string>>({
  placeholder,
  name,
  model,
  isValid,
  iconColor,
  style,
  iconSize,
}: SecureFieldProps<T>) => {
  const [secure, setSecure] = useState(true)
  return (
    <View>
      <Field
        placeholder={placeholder}
        formModel={model}
        name={name}
        style={style}
        isValid={isValid}
        textContentType={'password'}
        type={'default'}
        secureTextEntry={secure}
        autoCorrect={false}
        autoCapitalize="none"
        enablesReturnKeyAutomatically
        InputPseudoAfter={
          <ToggleSecureIcon
            secure={secure}
            setSecure={setSecure}
            color={iconColor}
            size={iconSize}
          />
        }
      />
    </View>
  )
}

export default SecureField
