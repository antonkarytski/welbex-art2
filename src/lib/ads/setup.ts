import mobileAds, { MaxAdContentRating } from 'react-native-google-mobile-ads'

type AdsConfigProps = {
  forAge?: number
}

export const configMobileAds = () => {
  return mobileAds().setRequestConfiguration({
    maxAdContentRating: MaxAdContentRating.PG,
    tagForChildDirectedTreatment: true,
    tagForUnderAgeOfConsent: true,
    testDeviceIdentifiers: ['EMULATOR'],
  })
}
