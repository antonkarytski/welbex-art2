import { Event, Store, createEffect, createEvent, restore } from 'effector'
import { Animated } from 'react-native'
import { fastSpringAnimation } from 'altek-toolkit'
import { ConcurrentTimeout, noop } from '../../helpers'

type PopUpShowProps<Props> = {
  autoClose?: number
  props?: Props
}

export class PopUpModel<P = any> {
  private nextValue = 0
  private autoCloseTime = 0

  private readonly autoCloseTimeout = new ConcurrentTimeout()
  private readonly setIsMounted = createEvent<boolean>()
  public readonly $isMounted = restore(this.setIsMounted, false)
  private readonly setProps = createEvent<P | null>()
  public readonly $props = restore(this.setProps, null)
  public readonly value = new Animated.Value(0)

  public constructor() {
    this.value.addListener(({ value }) => {
      if (value <= 0 && this.nextValue === 0) {
        this.setProps(null)
        this.setIsMounted(false)
      }
    })
  }

  private readonly changeState = createEffect((to: number) => {
    this.nextValue = to
    this.value.stopAnimation()
    return new Promise(fastSpringAnimation(this.value, to).start)
  })

  public on<T>(observable: Store<T> | Event<T>, fn?: (value: T) => boolean) {
    if (!fn) {
      observable.watch((value) => {
        if (value || value === undefined) return this.showSync()
        this.hideSync()
      })
      return this
    }
    observable.watch((value) => {
      const mapped = fn(value)
      if (mapped === undefined) return
      if (mapped) return this.showSync()
      this.hideSync()
    })
    return this
  }

  public autoClose(time: number) {
    this.autoCloseTime = time
    return this
  }

  public readonly show = createEffect(
    ({ autoClose = this.autoCloseTime, props }: PopUpShowProps<P> = {}) => {
      if (this.nextValue === 1) return
      this.setIsMounted(true)
      if (props) this.setProps(props)
      if (autoClose) this.autoCloseTimeout.start(this.hideSync, autoClose)
      return this.changeState(1)
    }
  )

  public readonly showSync = (props?: PopUpShowProps<P>) => {
    this.show(props).catch(noop)
  }

  public readonly hide = createEffect(() => {
    return this.changeState(0)
  })

  public readonly hideSync = () => {
    this.hide().catch(noop)
  }

  public readonly toggle = createEffect(() => {
    if (this.nextValue !== 1) return this.show()
    return this.hide()
  })
}
