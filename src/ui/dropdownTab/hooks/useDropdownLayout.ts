import { useEffect, useMemo, useState } from 'react'
import { Dimensions, ViewStyle } from 'react-native'
import { STATUSBAR_HEIGHT } from '../../../lib/device/dimensions'
import { IS_ANDROID } from '../../../lib/helpers/native/constants'
import { calculateDropdownHeight } from '../helpers'
import { ElementMeasureProps } from '../types'
import { useKeyboardRemainingScreenHeight } from './useKeyboardRemainingScreenHeight'

const screen = Dimensions.get('window')

type UseDropdownLayoutParams = {
  dropdownStyle?: ViewStyle
  indentFromTab: number
  considerKeyboard?: boolean
}

export const useDropdownLayout = ({
  dropdownStyle,
  indentFromTab,
  considerKeyboard = true,
}: UseDropdownLayoutParams) => {
  const [isOpened, setIsOpened] = useState(false)
  const [buttonLayout, setButtonLayout] = useState<ElementMeasureProps>()
  const [px, setPx] = useState(0)
  const [py, setPy] = useState(0)
  const [height, setHeight] = useState(() => {
    return calculateDropdownHeight(dropdownStyle)
  })
  const [width, setWidth] = useState<string | number>(0)
  const [isOpenOnTop, setIsOpenOnTop] = useState(false)
  const remainingHeightAvoidKeyboard = useKeyboardRemainingScreenHeight()

  useEffect(() => {
    setHeight(calculateDropdownHeight(dropdownStyle))
  }, [dropdownStyle])

  const onDropdownButtonLayout = (button: ElementMeasureProps) => {
    setButtonLayout(button)
    const openOnTop =
      screen.height - indentFromTab < button.py + button.h + height
    const yPos = IS_ANDROID ? button.py - STATUSBAR_HEIGHT : button.py
    const y = openOnTop ? yPos - indentFromTab : yPos + button.h + indentFromTab
    setPy(y)
    setIsOpenOnTop(openOnTop)
    setPx(button.px)

    setWidth(dropdownStyle?.width ?? button.w)
  }

  const calculatedContainerStyle = useMemo(() => {
    const top =
      considerKeyboard && remainingHeightAvoidKeyboard < py
        ? remainingHeightAvoidKeyboard
        : py
    const styles: ViewStyle = {
      borderTopWidth: 0,
      ...dropdownStyle,
      position: 'absolute',
      maxHeight: height,
      width: width,
      left: dropdownStyle?.left || px,
    }
    if (isOpenOnTop) {
      styles.bottom = screen.height - top
    } else {
      styles.top = top
    }
    return styles
  }, [
    isOpenOnTop,
    dropdownStyle,
    considerKeyboard,
    remainingHeightAvoidKeyboard,
    px,
    py,
    height,
    width,
  ])

  return {
    isOpened,
    setIsOpened,
    buttonLayout,
    onDropdownButtonLayout,
    calculatedContainerStyle,
  }
}
