import { Dimensions, NativeModules } from 'react-native'
import { IS_IOS } from '../../helpers/native/constants'

export const SCREEN_HEIGHT = Dimensions.get('screen').height

export const SCREEN_WIDTH = Dimensions.get('screen').width

export const STATUSBAR_HEIGHT = IS_IOS
  ? 20
  : NativeModules.StatusBarManager.HEIGHT
