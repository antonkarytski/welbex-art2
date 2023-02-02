import { Dimensions, NativeModules } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const SCREEN_HEIGHT = Dimensions.get('screen').height

export const SCREEN_WIDTH = Dimensions.get('screen').width

export const STATUSBAR_HEIGHT = getStatusBarHeight()
