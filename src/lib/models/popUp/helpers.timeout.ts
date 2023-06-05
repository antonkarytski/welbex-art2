import { Timer } from 'altek-toolkit'

export class ConcurrentTimeout {
  private timer: Timer | null = null

  public start(callback: () => void, time: number) {
    if (this.timer) clearTimeout(this.timer)
    const t = setTimeout(() => {
      callback()
      clearTimeout(t)
      this.timer = null
    }, time)
    this.timer = t
  }
}
