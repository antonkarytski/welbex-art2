import { useStore } from 'effector-react'
import React, { ReactNode } from 'react'
import { Animated, StyleSheet } from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import { getMoveStyle } from '../../lib/componentsModels/popUp/helpers'
import { PopUpModel } from '../../lib/componentsModels/popUp/model'

export type PopUpCardProps = {
  model: PopUpModel
  isClosable?: boolean
  onPress?: () => void
  children: ReactNode
}

const PopUpCard = React.memo<PopUpCardProps>(({ model, children }) => {
  const isMounted = useStore(model.$isMounted)
  const { styles, colors } = useTheme(themedStyle)

  const translateStyle = getMoveStyle(model.value)
  const opacityStyle = { opacity: model.value }

  if (!isMounted) return null

  return (
    <Animated.View style={[styles.container, translateStyle, opacityStyle]}>
      {children}
    </Animated.View>
  )
})

const themedStyle = createThemedStyle((colors) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      paddingHorizontal: 16,
      top: 117,
    },
    card: {
      borderWidth: 1,
      borderRadius: 10,
      backgroundColor: colors.card,
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 18,
      flexDirection: 'row',
    },
    iconBlock: { paddingLeft: 20 },
    textBlock: { marginLeft: 12, flex: 1 },
    title: { fontSize: 16, marginBottom: 8 },
    text: {
      color: colors.text,
    },
  })
)

export default PopUpCard
