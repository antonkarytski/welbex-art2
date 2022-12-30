import { useStore } from 'effector-react'
import React, { ReactNode } from 'react'
import {
  Animated,
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { createThemedStyle } from '../../features/themed'
import { useTheme } from '../../features/themed/hooks'
import { PopUpModel } from '../../lib/componentsModels/popUp/model'

export type PopUpCardProps = {
  model: PopUpModel
  children: ReactNode
  style?: StyleProp<ViewStyle>
}

const PopUpCard = React.memo<PopUpCardProps>(({ model, children, style }) => {
  const isMounted = useStore(model.$isMounted)
  const { styles } = useTheme(themedStyle)
  const opacityStyle = { opacity: model.value }

  if (!isMounted) return null

  return (
    <Animated.View style={[styles.overlay, opacityStyle]}>
      <TouchableOpacity
        onPress={model.hideSync}
        activeOpacity={0.9}
        style={styles.overlayButton}
      />
      <View style={[styles.card, style]}>{children}</View>
    </Animated.View>
  )
})

const themedStyle = createThemedStyle((colors) =>
  StyleSheet.create({
    overlay: {
      position: 'absolute',
      height: '100%',
      top: 0,
      width: '100%',
      zIndex: 100,
      justifyContent: 'center',
    },
    overlayButton: {
      flex: 1,
      backgroundColor: colors.modalOverlay,
      height: '100%',
      width: '100%',
      paddingHorizontal: 20,
      zIndex: -1,
    },
    card: {
      backgroundColor: colors.screenBackground,
      borderRadius: 20,
      padding: 20,
      zIndex: 20,
      width: Dimensions.get('window').width - 40,
      left: 20,
      alignSelf: 'center',
      position: 'absolute',
    },
  })
)

export default PopUpCard
