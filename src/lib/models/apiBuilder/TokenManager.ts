import { createEffect, createEvent, createStore, attach } from 'effector'
import { addStorePersist, days, minutes } from 'altek-toolkit'
import { getTokenStatus } from './helpers.token'
import {
  TokenRefresher,
  TokenSettings,
  TokenStatus,
  Tokens,
} from './types.token'

const TOKEN_SAVE_DEFAULT_KEY = '@token_info'
type TokenModel = Tokens & {
  startTime: number
}

export class TokenManager {
  private readonly refresher: TokenRefresher
  private readonly persist
  private readonly accessLifeTime
  private readonly refreshLifeTime

  public readonly reset = createEvent()
  public readonly set = createEvent<Tokens>()
  private readonly $model = createStore<TokenModel | null>(null)
    .on(this.set, (_, tokens) => ({ ...tokens, startTime: Date.now() }))
    .reset(this.reset)
  private startTime: number = 0

  constructor(
    refresher: TokenRefresher,
    {
      accessLifeTime = minutes(30),
      refreshLifeTime = days(30),
      dbField = TOKEN_SAVE_DEFAULT_KEY,
    }: TokenSettings = {}
  ) {
    this.refresher = refresher
    this.accessLifeTime = accessLifeTime
    this.refreshLifeTime = refreshLifeTime

    this.persist = addStorePersist({
      $store: this.$model,
      saveTo: dbField,
    })
    this.persist.onInit((result) => {
      if (!result) return
      this.set(result)
    })
  }

  public readonly get = attach({
    source: this.$model,
    mapParams: (_: void, token) => token,
    effect: createEffect((token: TokenModel | null) => {
      if (!token) return null
      const status = getTokenStatus({
        token: token.access,
        startTime: token.startTime,
        lifeTime: this.accessLifeTime,
        refreshTime: this.refreshLifeTime,
      })
      if (status === TokenStatus.FRESH) return token.access
      if (status === TokenStatus.EXPIRED) return this.refresh()
      if (status === TokenStatus.REFRESH_EXPIRED) {
        this.reset()
        return null
      }
      if (status === TokenStatus.NONE) return null
    }),
  })

  public readonly refresh = attach({
    source: this.$model,
    mapParams: (_: void, source) => source,
    effect: createEffect(async (props: Tokens | null) => {
      if (!props) return null
      const token = await this.refresher(props)
      this.set(token)
      return token
    }),
  })
}
