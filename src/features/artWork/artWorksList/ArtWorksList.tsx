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
import { ArtPreview } from '../../../api/parts/arts/types'
import { useNavigate } from '../../../navigation'
import { links } from '../../../navigation/links'
import { ScreensProps } from '../../../navigation/types.screenProps'
import {
  SCREEN_CONTENT_WIDTH,
  SCREEN_PADDING_HORIZONTAL,
} from '../../../styles/constants'
import { themedShadow5Style } from '../../../styles/shadows'
import { createThemedStyle } from '../../themed'
import { useThemedStyle } from '../../themed/hooks'
import { drawingKeyExtractor } from '../helpers'
import ArtWorkItem from './ArtWorkItem'
import { DRAWINGS_COLUMNS_COUNT, DRAWING_ITEM_MARGIN } from './constants'

export type ArtWorksFlatListProps = {
  contentStyle?: FlatListProps<any>['contentContainerStyle']
  containerStyle?: StyleProp<ViewStyle>
  onEndReached?: () => void
  onRefresh?: () => void
  ListHeader?: ReactElement
} & Omit<FlatListProps<any>, 'renderItem'>

export type ArtWorksListProps<L extends links> = {
  data: ArtPreview[]
  detailsLink?: ScreensProps[L] extends { item: ArtPreview } ? L : never
} & ArtWorksFlatListProps

function getImageSize() {
  return (SCREEN_CONTENT_WIDTH - DRAWING_ITEM_MARGIN) / 2
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
    ref: ForwardedRef<FlatList<ArtPreview>>
  ) => {
    const imageSize = getImageSize()
    const styles = useThemedStyle(themedStyles)
    const navigate = useNavigate()

    const goToDrawingDetails = useCallback(
      (item: ArtPreview) => navigate(links.artWorkDetails, { item }),
      [navigate]
    )

    const renderItem = useCallback(
      ({ item }: { item: ArtPreview }) => {
        return (
          <ArtWorkItem
            containerStyle={styles.itemContainer}
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
    itemContainer: {
      ...themedShadow5Style(colors),
      marginBottom: 20,
      borderRadius: 20,
      overflow: 'hidden',
    },
    listContentContainer: {
      paddingVertical: 24,
      paddingHorizontal: SCREEN_PADDING_HORIZONTAL,
    },
  })
)

export default ArtWorksList
