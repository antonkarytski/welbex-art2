import { createEvent, createStore, restore } from 'effector'
import { Animated } from 'react-native'
import { api } from '../../../api'
import { IdentityDocumentStatus } from '../../../api/parts/users/types.api'
import { $myProfile, updateProfile } from '../model'

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

uploadChildDocument.done.watch(() => {
  updateProfile({
    identity_determined_status_id: IdentityDocumentStatus.PENDING,
  })
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

const setIsChildDocumentUploaded = createEvent<boolean>()
export const $isChildDocumentUploaded = restore(
  setIsChildDocumentUploaded,
  false
)

$myProfile.watch((myProfile) => {
  setIsChildDocumentUploaded(
    myProfile?.identity_determined_status_id !==
      IdentityDocumentStatus.UNDETERMINED
  )
})
