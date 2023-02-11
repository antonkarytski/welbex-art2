type GetTokenStatusProps = {
  token: string | null
  startTime: number
  refreshTime: number
  lifeTime: number
}

export enum TokenStatus {
  NONE = 0,
  FRESH = 1,
  EXPIRED = 2,
  REFRESH_EXPIRED = 3,
}

export function getTokenStatus({
  token,
  startTime,
  lifeTime,
  refreshTime,
}: GetTokenStatusProps): TokenStatus {
  if (!token || !startTime) return TokenStatus.NONE
  const tokenExistTime = Date.now() - lifeTime
  if (tokenExistTime < lifeTime) {
    return TokenStatus.FRESH
  }
  if (tokenExistTime < refreshTime) {
    return TokenStatus.EXPIRED
  }
  return TokenStatus.REFRESH_EXPIRED
}
