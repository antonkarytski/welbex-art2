import countriesObj from '../../../assets/countriesObj.json'

export type CountryCode = keyof typeof countriesObj

export type Country = {
  name: string
  nativeName: string
  alpha2Code: CountryCode
  alpha3Code: string
  callingCodes: string[]
  flags: {
    svg: string
    png: string
  }
  region: string
  timezones: string[]
  currencies?: Currency[]
  languages: Languages[]
  translations: CountryTranslations
  emoji: string
}

export type Currency = {
  code: string
  name: string
  symbol: string
}

export type Languages = {
  iso639_1?: string
  iso639_2: string
  name: string
  nativeName?: string
}

export type CountryTranslations = {
  br: string
  nl: string
  hr: string
  fa?: string
  de: string
  es: string
  fr: string
  ja: string
  it: string
  hu: string
}
