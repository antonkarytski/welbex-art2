import { Animated } from 'react-native'
import {
  createAnimatedModel,
  timingAnimation,
  AnimationEffectHandler,
} from 'altek-toolkit'

const showAnimation: AnimationEffectHandler = (value, to) => {
  return Animated.spring(value, {
    toValue: to,
    tension: 50,
    useNativeDriver: true,
    friction: 10,
    restDisplacementThreshold: 0.45,
    restSpeedThreshold: 0.04,
  })
}
const hideAnimation: AnimationEffectHandler = (value, to) =>
  timingAnimation(value, to, 250)

export const attachMenu = createAnimatedModel({
  hideAnimation,
})

export const attachMenuSendButton = createAnimatedModel({
  showAnimation,
  hideAnimation,
})
