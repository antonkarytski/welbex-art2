import { Effect, createEffect } from 'effector'

export const prependEffect = <P, ET, ER>(
  effect: Effect<ET, ER>,
  prepend: (props: P) => ET
) => createEffect((props: P) => effect(prepend(props)))
