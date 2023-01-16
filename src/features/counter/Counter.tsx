import React, { MutableRefObject, useEffect, useRef } from 'react'
import { TextStyle } from 'react-native'
import {
  ControlledTimerProps,
  useControlledTimer,
} from '../../lib/timer/controlledTimer'
import Clock from './Clock'

export type TimerInterface = ReturnType<
  typeof useControlledTimer
>['timerInterface']

type CounterProps = {
  style?: TextStyle
  onReach?: () => void
  startValue: number
  timerInterfaceRef?: MutableRefObject<TimerInterface | null>
} & Omit<ControlledTimerProps, 'time'>

export default function Counter({
  style,
  startValue,
  timerInterfaceRef,
  onReach,
  onGenerate,
  onTick,
  condition,
  tick = 1000,
  controlled = true,
  cycle = false,
  iteratorMode = 'dec',
}: CounterProps) {
  const onReachRef = useRef(onReach)
  onReachRef.current = onReach
  const { current: counter, timerInterface } = useControlledTimer({
    cycle,
    controlled,
    time: startValue * 1000,
    tick,
    iteratorMode,
    onTick,
    onGenerate,
    condition,
  })

  useEffect(() => {
    if (!timerInterfaceRef) return
    timerInterfaceRef.current = timerInterface
  }, [timerInterfaceRef, timerInterface])

  useEffect(() => {
    if (counter > 0 || !onReachRef.current) return
    onReachRef.current()
  }, [counter])

  return <Clock value={counter} style={style} />
}
