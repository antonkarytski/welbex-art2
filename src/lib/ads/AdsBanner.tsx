import { useStore } from 'effector-react'
import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import {
  BannerAd,
  BannerAdSize,
  RequestOptions,
} from 'react-native-google-mobile-ads'
import { AdsName, getAds } from './list'
import { $isAdsInitialized } from './model.init'

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
    const isInitiated = useStore($isAdsInitialized)
    if (!isInitiated) return null

    return (
      <View style={[styles.container, defaultStyle, style]}>
        <BannerAd
          unitId={ads.id}
          size={size}
          requestOptions={{ ...defaultRequestOptions, ...requestOptions }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
})
