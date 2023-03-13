import { createEvent, createStore } from 'effector'
import { Animated } from 'react-native'
import { api } from '../../api'

export const uploadChildDocument = api.users.uploadChildDocument.copy()

export const setIsChildDocumentOnLoading = createEvent<boolean>()
export const $isChildDocumentOnLoading = createStore(false).on(
  setIsChildDocumentOnLoading,
  (_, payload) => payload
)
export const childDocumentProgressAnimatedValue = new Animated.Value(0)

uploadChildDocument.watch(() => {
  childDocumentProgressAnimatedValue.setValue(0)
  setIsChildDocumentOnLoading(true)
})

uploadChildDocument.finally.watch(() => {
  childDocumentProgressAnimatedValue.setValue(0)
  setIsChildDocumentOnLoading(false)
})

uploadChildDocument.progress.watch((e) => {
  Animated.timing(childDocumentProgressAnimatedValue, {
    toValue: e.loaded / e.total,
    duration: 100,
    useNativeDriver: false,
  }).start()
})
