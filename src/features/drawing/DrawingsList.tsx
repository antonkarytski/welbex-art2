import React, {
  ForwardedRef,
  ReactElement,
  forwardRef,
  useCallback,
} from 'react'
import {
  Animated,
  FlatList,
  FlatListProps,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native'
import { ArtWorkPreviewResponse } from '../../api/parts/categories/types'
import { SCREEN_WIDTH } from '../../lib/device/dimensions'
import { useNavigate } from '../../navigation'
import { links } from '../../navigation/links'
import { ScreensProps } from '../../navigation/types.screenProps'
import { SCREEN_PADDING_HORIZONTAL } from '../../styles/constants'
import { themedShadow5Style } from '../../styles/shadows'
import { createThemedStyle } from '../themed'
import { useThemedStyle } from '../themed/hooks'
import DrawingItem from './DrawingItem'
import { drawingKeyExtractor } from './helpers'

export type DrawingFlatListProps = {
  onScroll?: FlatListProps<any>['onScroll']
  contentStyle?: FlatListProps<any>['contentContainerStyle']
  onEndReached?: () => void
  onRefresh?: () => void
  ListHeader?: ReactElement
  onScrollEndDrag?: () => void
  refreshing?: FlatListProps<any>['refreshing']
  ListFooterComponent?: FlatListProps<any>['ListFooterComponent']
}

export type DrawingsListProps<L extends links> = {
  data: ArtWorkPreviewResponse[]
  detailsLink?: ScreensProps[L] extends { item: ArtWorkPreviewResponse }
    ? L
    : never
} & DrawingFlatListProps

function getImageSize() {
  return (SCREEN_WIDTH - SCREEN_PADDING_HORIZONTAL * 3) / 2
}

const DrawingsList = forwardRef(
  <L extends links>(
    { data, ListHeader, contentStyle, ...props }: DrawingsListProps<L>,
    ref: ForwardedRef<FlatList<ArtWorkPreviewResponse>>
  ) => {
    const imageSize = getImageSize()
    const styles = useThemedStyle(themedStyles)
    const navigate = useNavigate()

    const goToDrawingDetails = useCallback(
      (item: ArtWorkPreviewResponse) =>
        navigate(links.drawingDetails, { item }),
      [navigate]
    )

    const renderItem = useCallback(
      ({ item }: { item: ArtWorkPreviewResponse }) => {
        return (
          <DrawingItem
            containerStyle={styles.itemContainer}
            style={styles.item as ImageStyle}
            size={imageSize}
            item={item}
            onPress={goToDrawingDetails}
          />
        )
      },
      [imageSize, styles, goToDrawingDetails]
    )

    return (
      <View style={styles.container}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          ref={ref}
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          columnWrapperStyle={styles.listColumnWrapper}
          numColumns={2}
          keyExtractor={drawingKeyExtractor}
          contentContainerStyle={[styles.listContentContainer, contentStyle]}
          onMomentumScrollEnd={props.onScrollEndDrag}
          {...props}
        />
      </View>
    )
  }
)

const themedStyles = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    listColumnWrapper: {
      justifyContent: 'space-between',
    },
    item: {
      marginBottom: 20,
      borderRadius: 20,
    },
    itemContainer: themedShadow5Style(colors),
    listContentContainer: {
      paddingVertical: 24,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
    hListContentContainer: {
      paddingVertical: 24,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
  })
)

export default DrawingsList
