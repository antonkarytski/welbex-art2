import {
  MutableRefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { Animated, FlatList } from 'react-native'
import { TabListSettings } from './hooks.drawingTabs'

type UseListTabsSyncProps = {
  scrollOffsetValue: Animated.Value
  topOffset: number
  currentTabRef: MutableRefObject<string | null>
}

export function useTabsListsSync({
  scrollOffsetValue,
  topOffset,
  currentTabRef,
}: UseListTabsSyncProps) {
  const listRefs = useRef<Partial<Record<string, FlatList | null>>>({})
  const listOffsets = useRef<Partial<Record<string, number>>>({})

  const syncScrollOffset = useCallback(() => {
    const current = currentTabRef.current
    Object.entries(listRefs.current).forEach(([key, item]) => {
      //@ts-ignore
      const value = scrollOffsetValue._value
      if (key === current || !item) return
      if (value < topOffset && value >= 0) {
        item.scrollToOffset({
          offset: value,
          animated: false,
        })
        listOffsets.current[key] = value
        return
      }
      if (value >= topOffset) {
        const tabOffset = listOffsets.current[key]
        if (tabOffset === undefined || tabOffset < topOffset) {
          item.scrollToOffset({
            offset: topOffset,
            animated: false,
          })
          listOffsets.current[key] = topOffset
        }
      }
    })
  }, [topOffset, scrollOffsetValue, currentTabRef])

  useEffect(() => {
    scrollOffsetValue.addListener(({ value }) => {
      if (!currentTabRef.current) return
      const tab = currentTabRef.current
      listOffsets.current[tab] = value
    })

    return () => {
      scrollOffsetValue.removeAllListeners()
    }
  }, [scrollOffsetValue, currentTabRef])

  return useMemo<TabListSettings>(
    () => ({
      // onScroll: Animated.event(
      //   [{ nativeEvent: { contentOffset: { y: scrollOffsetValue } } }],
      //   { useNativeDriver: true }
      // ),
      listRef: (key, ref) => {
        listRefs.current[key] = ref
      },
      // onScrollEnd: syncScrollOffset,
    }),
    [syncScrollOffset]
  )
}
