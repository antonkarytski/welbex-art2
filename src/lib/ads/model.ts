import { attach, createEffect, createEvent, sample } from 'effector'
import { createStateModel } from 'altek-toolkit'
import { MyProfile } from '../../api/parts/users/types'
import { $myProfile } from '../../features/profile/model'
import { AdsController, createAdsController } from './AdsController'
import { AdsName } from './list'

type CreateAdsModelSettings = {
  filter?: (profile: MyProfile) => boolean
}

type DebugProps = {
  ignoreFilter?: boolean
}

class AdsModel {
  private isDebugIgnoreFilter = false
  private isDebugActive = false

  private settings
  private name
  private readonly controller = createStateModel<AdsController | null>(null)

  public readonly init = createEvent()
  public readonly run = attach({
    source: this.controller.$state,
    mapParams: (_: void, ads) => ads,
    effect: createEffect((ads: AdsController | null) => {
      if (!ads) return
      return ads.show().then((res) => {
        this.controller.reset()
        return res
      })
    }),
  })

  private readonly filterAdsCreate = (profile: MyProfile | null) => {
    const extFilter = this.settings?.filter
    return (
      (!profile?.subscription || this.isDebugActive) &&
      (!extFilter || this.isDebugIgnoreFilter || !profile || extFilter(profile))
    )
  }

  public constructor(name: AdsName, settings?: CreateAdsModelSettings) {
    this.name = name
    this.settings = settings
    sample({
      source: $myProfile,
      clock: this.init,
      filter: this.filterAdsCreate,
      fn: () => createAdsController(name),
      target: this.controller.set,
    })
  }

  public debug(props?: DebugProps) {
    this.isDebugActive = true
    this.isDebugIgnoreFilter = !!props?.ignoreFilter
    return this
  }
}

export const createAdsModel = (
  name: AdsName,
  settings?: CreateAdsModelSettings
) => {
  return new AdsModel(name, settings)
}
