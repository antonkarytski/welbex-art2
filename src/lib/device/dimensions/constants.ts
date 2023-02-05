import { Dimensions } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

export const SCREEN_HEIGHT = Dimensions.get('screen').height
export const SCREEN_WIDTH = Dimensions.get('screen').width

export const WINDOW_HEIGHT = Dimensions.get('window').height
export const WINDOW_WIDTH = Dimensions.get('window').width

export const BOTTOM_BAR_HEIGHT = SCREEN_HEIGHT - WINDOW_HEIGHT

export const STATUSBAR_HEIGHT = getStatusBarHeight()
