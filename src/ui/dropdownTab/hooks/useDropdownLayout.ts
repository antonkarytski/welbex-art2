import { useEffect, useMemo, useState } from 'react'
import { Dimensions, ViewStyle } from 'react-native'
import { calculateDropdownHeight } from '../helpers'
import { ElementMeasureProps } from '../types'
import { useKeyboardRemainingScreenHeight } from './useKeyboardRemainingScreenHeight'

const { height } = Dimensions.get('window')

type UseDropdownLayoutParams = {
  dropdownStyle?: ViewStyle
  indentFromTab: number
}

export const useDropdownLayout = ({
  dropdownStyle,
  indentFromTab,
}: UseDropdownLayoutParams) => {
  const [isOpened, setIsOpened] = useState(false)
  const [buttonLayout, setButtonLayout] = useState<ElementMeasureProps>()
  const [dropdownPX, setDropdownPX] = useState(0)
  const [dropdownPY, setDropdownPY] = useState(0)
  const [dropdownHEIGHT, setDropdownHEIGHT] = useState(() => {
    return calculateDropdownHeight(dropdownStyle)
  })
  const [dropdownWIDTH, setDropdownWIDTH] = useState<string | number>(0)
  const remainigHeightAvoidKeyboard = useKeyboardRemainingScreenHeight()

  useEffect(() => {
    setDropdownHEIGHT(calculateDropdownHeight(dropdownStyle))
  }, [dropdownStyle])

  const onDropdownButtonLayout = ({ w, h, px, py }: ElementMeasureProps) => {
    setButtonLayout({ w, h, px, py })
    const opetToTop = height - indentFromTab < py + h + dropdownHEIGHT
    if (opetToTop) {
      setDropdownPX(px)
      setDropdownPY(py - dropdownHEIGHT - indentFromTab)
    } else {
      setDropdownPX(px)
      setDropdownPY(py + h + indentFromTab)
    }
    setDropdownWIDTH(dropdownStyle?.width ?? w)
  }

  const calculatedContainerStyle: ViewStyle = useMemo(() => {
    const top =
      remainigHeightAvoidKeyboard < dropdownPY
        ? remainigHeightAvoidKeyboard
        : dropdownPY
    return {
      borderTopWidth: 0,
      ...dropdownStyle,
      position: 'absolute',
      top: top,
      height: dropdownHEIGHT,
      width: dropdownWIDTH,
      left: dropdownStyle?.left || dropdownPX,
    }
  }, [
    dropdownStyle,
    remainigHeightAvoidKeyboard,
    dropdownPX,
    dropdownPY,
    dropdownHEIGHT,
    dropdownWIDTH,
  ])

  return {
    isOpened,
    setIsOpened,
    buttonLayout,
    onDropdownButtonLayout,
    calculatedContainerStyle,
  }
}
