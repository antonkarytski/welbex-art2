import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import {
  BannerAd,
  BannerAdSize,
  RequestOptions,
} from 'react-native-google-mobile-ads'
import { AdsName, getAds } from './list'

type AdsBannerProps = {
  style?: StyleProp<ViewStyle>
  requestOptions?: RequestOptions
}

type CreateAdsBannerSettings = {
  size?: BannerAdSize
} & Partial<AdsBannerProps>

export const createAdsBanner = (
  name: AdsName,
  {
    style: defaultStyle,
    requestOptions: defaultRequestOptions = {},
    size = BannerAdSize.INLINE_ADAPTIVE_BANNER,
  }: CreateAdsBannerSettings = {}
) => {
  const ads = getAds(name)
  return ({ style, requestOptions }: AdsBannerProps) => {
    return (
      <View style={[defaultStyle, style]}>
        <BannerAd
          unitId={ads.id}
          size={size}
          requestOptions={{ ...defaultRequestOptions, ...requestOptions }}
        />
      </View>
    )
  }
}
