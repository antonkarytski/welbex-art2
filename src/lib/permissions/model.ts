import { attach, createEffect, createEvent, restore } from 'effector'

type CreatePermissionModelProps<R extends string | number | object> = {
  check: () => Promise<R>
  request: () => Promise<R>
  initialStatus: R
  grantedStatus: ((value: R) => boolean) | R
}

export const createPermissionModel = <R extends string | number | object>({
  check,
  request,
  initialStatus,
  grantedStatus,
}: CreatePermissionModelProps<R>) => {
  const statusToBool = (status: R): boolean => {
    if (typeof grantedStatus === 'function') return grantedStatus(status)
    return status === grantedStatus
  }

  const setStatus = createEvent<R>()
  const $status = restore(setStatus, initialStatus)
  const $isGranted = $status.map(statusToBool)

  const requestFx = createEffect(request)
  requestFx.done.watch(({ result }) => setStatus(result))

  const init = () => {
    check().then(setStatus)
  }

  const getIsGranted = attach({
    source: $isGranted,
    effect: createEffect(async (isGranted: boolean) => {
      return isGranted || statusToBool(await request())
    }),
  })

  return {
    init,
    $status,
    $isGranted,
    check: getIsGranted,
  }
}
