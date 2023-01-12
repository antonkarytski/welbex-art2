import { AgeTextGenerator } from '../../features/user/UserDescription'
import { LangStructure } from '../../translations/types'

export function createMemoByWeakMap<K extends object, V>(
  generator: (key: K) => V
) {
  return (key: K): V => {
    const memoized = new WeakMap<K, V>()
    return (
      memoized.get(key) ??
      (() => {
        const value = generator(key)
        memoized.set(key, value)
        return value
      })()
    )
  }
}
