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
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
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
import ArtWorkItem from './ArtWorkItem'
import { drawingKeyExtractor } from './helpers'

export type ArtWorksFlatListProps = {
  onScroll?: FlatListProps<any>['onScroll']
  contentStyle?: FlatListProps<any>['contentContainerStyle']
  containerStyle?: StyleProp<ViewStyle>
  onEndReached?: () => void
  onRefresh?: () => void
  ListHeader?: ReactElement
  onScrollEndDrag?: FlatListProps<any>['onMomentumScrollEnd']
  refreshing?: FlatListProps<any>['refreshing']
  ListFooterComponent?: FlatListProps<any>['ListFooterComponent']
  onLayout?: FlatListProps<any>['onLayout']
  listKey?: FlatListProps<any>['listKey']
  ListEmptyComponent?: FlatListProps<any>['ListEmptyComponent']
  getItemLayout?: FlatListProps<any>['getItemLayout']
}

export const DRAWING_ITEM_MARGIN = 20
export const DRAWINGS_COLUMNS_COUNT = 2

export type ArtWorksListProps<L extends links> = {
  data: ArtWorkPreviewResponse[]
  detailsLink?: ScreensProps[L] extends { item: ArtWorkPreviewResponse }
    ? L
    : never
} & ArtWorksFlatListProps

function getImageSize() {
  return (
    (SCREEN_WIDTH - (SCREEN_PADDING_HORIZONTAL * 2 + DRAWING_ITEM_MARGIN)) / 2
  )
}

const ArtWorksList = forwardRef(
  <L extends links>(
    {
      data,
      ListHeader,
      contentStyle,
      listKey,
      containerStyle,
      ...props
    }: ArtWorksListProps<L>,
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
          <ArtWorkItem
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
      <View style={[styles.container, containerStyle]}>
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          ref={ref}
          data={data}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
          columnWrapperStyle={styles.listColumnWrapper}
          numColumns={DRAWINGS_COLUMNS_COUNT}
          keyExtractor={drawingKeyExtractor}
          listKey={listKey}
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
  })
)

export default ArtWorksList
