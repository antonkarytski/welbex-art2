import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

type UseKeyboardSubscriptionProps = {
  controlled?: boolean
  onChange?: (state: boolean) => void
  onShow?: () => void
  onHide?: () => void
}

export function useKeyboardSubscription({
  controlled,
  onShow,
}: UseKeyboardSubscriptionProps) {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false)

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (controlled) setKeyboardVisible(true)
        if (onShow) onShow()
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (controlled) setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [onShow, controlled])

  return isKeyboardVisible
}
