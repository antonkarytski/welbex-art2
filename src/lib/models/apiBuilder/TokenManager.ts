import { attach, createEffect, createEvent, createStore } from 'effector'
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

  private _onInit: ((tokens: TokenModel | null) => void) | null = null

  public readonly reset = createEvent()
  public readonly set = createEvent<Tokens>()
  public readonly $store = createStore<TokenModel | null>(null)
    .on(this.set, (_, tokens) => ({ ...tokens, startTime: Date.now() }))
    .reset(this.reset)

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
      $store: this.$store,
      saveTo: dbField,
    })
    this.persist.onInit((result) => {
      this._onInit?.(result ?? this.$store.getState() ?? null)
      if (!result) return
      this.set(result)
    })
  }

  public readonly get = attach({
    source: this.$store,
    mapParams: (_: void, token) => token,
    effect: createEffect(
      async (token: TokenModel | null): Promise<Tokens | null | undefined> => {
        if (!token) return null
        const status = getTokenStatus({
          token: token.access,
          startTime: token.startTime,
          lifeTime: this.accessLifeTime,
          refreshTime: this.refreshLifeTime,
        })
        if (status === TokenStatus.FRESH) return token
        if (status === TokenStatus.EXPIRED) return this.refresh()
        if (status === TokenStatus.REFRESH_EXPIRED) {
          this.reset()
          return null
        }
        if (status === TokenStatus.NONE) return null
      }
    ),
  })

  public readonly refresh = attach({
    source: this.$store,
    mapParams: (_: void, source) => source,
    effect: createEffect(async (tokens: Tokens | null) => {
      if (!tokens) return null
      const token = await this.refresher(tokens)
      if (!token) return null
      this.set(token)
      return token
    }),
  })

  public onInit(fn: (tokens: TokenModel | null) => void) {
    if (this.persist.isInitiated) {
      return fn(this.$store.getState() ?? null)
    }
    this._onInit = fn
  }
}
