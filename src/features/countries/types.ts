export type ICountry = {
  fullName: string
  flag: string
}

export type Country = {
  name: string
  nativeName: string
  alpha2Code: string
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
