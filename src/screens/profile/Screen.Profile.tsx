import { useStore } from 'effector-react'
import React, { useRef, useState } from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { $isAuth } from '../../features/auth/model'
import ProfileDrawingsListTabs from '../../features/profile/ProfileDrawingsListTabs'
import ProfileTopBlock, {
  PROFILE_TOP_BLOCK_INITIAL_HEIGHT,
} from '../../features/profile/ProfileTopBlock'
import UnauthorizedProfile from '../../features/profile/UnauthorizedProfile'

const ProfileScreen = () => {
  const [topBlockHeight, setTopBlockHeight] = useState(
    PROFILE_TOP_BLOCK_INITIAL_HEIGHT
  )
  const isAuth = useStore($isAuth)
  const offset = useRef(new Animated.Value(0)).current

  if (!isAuth) return <UnauthorizedProfile />

  return (
    <View style={styles.container}>
      <ProfileTopBlock
        onHeightChange={setTopBlockHeight}
        offsetValue={offset}
      />
      <ProfileDrawingsListTabs
        scrollOffsetValue={offset}
        topOffset={topBlockHeight}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ProfileScreen
