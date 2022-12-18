import React, { ReactNode } from 'react'
import {
  Dimensions,
  FlatList,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native'
import { createThemedStyle } from '../features/themed'
import { useThemedStyle } from '../features/themed/hooks'
import { useText } from '../translations/hook'
import H2 from '../ui/H2'
import H3 from '../ui/H3'
import Span from '../ui/Span'
import DrawingItem from './DrawingItem'
import { Drawing } from './types'

type DrawingsListProps = {
  data: Drawing[]
  ListHeader: ReactNode
}

const PADDING_SIZE = 20

const DrawingsList = ({ data, ListHeader }: DrawingsListProps) => {
  const screenWidth = Dimensions.get('screen').width
  const imageSize = (screenWidth - PADDING_SIZE * 3) / 2

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FlatList
        ListHeaderComponent={<>{ListHeader}</>}
        data={data}
        contentContainerStyle={{
          paddingHorizontal: PADDING_SIZE,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <DrawingItem
              style={{
                marginBottom: 20,
                borderRadius: 20,
              }}
              size={imageSize}
              image={item.image}
            />
          )
        }}
        keyExtractor={({ id }) => id}
      />
    </View>
  )
}

export default DrawingsList
