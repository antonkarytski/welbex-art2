import { RESULTS, check, request } from 'react-native-permissions'
import { Permission } from 'react-native-permissions/src/types'
import { createPermissionModel } from './model'

export const createNativePermissionModel = (name: Permission) => {
  return createPermissionModel({
    check: () => check(name),
    request: () => request(name),
    initialStatus: RESULTS.DENIED,
    grantedStatus: RESULTS.GRANTED,
  })
}
