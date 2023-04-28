import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useText } from '../../../translations/hook'
import { LangFn } from '../../../translations/types'
import Span from '../../../ui/Span'
import { UserDrawingListType } from '../types'

type UserDrawingsEmptyComponentProps = {
  listType: UserDrawingListType
}

const EMPTY_LIST_LABELS: Record<UserDrawingListType, LangFn> = {
  [UserDrawingListType.OWN]: (t) => t.noDrawingsYet,
  [UserDrawingListType.LIKED]: (t) => t.emptyListOfLikedArts,
  [UserDrawingListType.SAVED]: (t) => t.emptyListOfSavedArts,
}

const UserDrawingsEmptyComponent = ({
  listType,
}: UserDrawingsEmptyComponentProps) => {
  // TODO: rework when design will ready
  const t = useText()
  const label = EMPTY_LIST_LABELS[listType](t)
  return (
    <View style={styles.container}>
      <Span label={label} style={styles.label} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#616868',
    alignItems: 'center',
  },
})

export default UserDrawingsEmptyComponent
