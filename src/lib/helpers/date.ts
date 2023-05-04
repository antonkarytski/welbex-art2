import moment from 'moment'
import 'moment/locale/ru'

export const STANDARD_DATE_FORMAT = 'YYYY-MM-DD'
export function getDayOffset(date: number) {
  const today = Number(moment().format('DD'))
  return today > date
    ? Number(moment().daysInMonth()) - today + date
    : date - today
}

export function parseTime(time: string, type: string) {
  const parseResult = time.match(/(\d+):\d{2}/)
  const hour = parseResult ? parseResult[1] : 1
  const normalizedHour = type === 'am' ? Number(hour) : Number(hour) + 12
  return normalizedHour === 24 ? 0 : normalizedHour
}

export function toSeconds(value: number) {
  return value / 1000
}

export function toMinutes(value: number) {
  return value / 60 / 1000
}

export function toHours(value: number) {
  return value / 60 / 60 / 1000
}

export function toDays(value: number) {
  return value / 24 / 60 / 60 / 1000
}

export function seconds(value: number) {
  return value * 1000
}

export function minutes(value: number) {
  return value * 60 * 1000
}

export function hours(value: number) {
  return value * 60 * 60 * 1000
}

export function days(value: number) {
  return value * 24 * 60 * 60 * 1000
}

export function years(value: number) {
  return value * 365 * 24 * 60 * 60 * 1000
}

export function lifeTimePassed(timerStartAt: string | number) {
  if (typeof timerStartAt === 'string')
    return Date.now() - Date.parse(timerStartAt)
  return Date.now().valueOf() - timerStartAt
}

export function lifeTimeLeft(
  lifeTime: number,
  timerStartAt: string | number
): number {
  return lifeTime - lifeTimePassed(timerStartAt)
}

export function isTimeLeft(
  lifeTime: number,
  timerStartAt: string | number
): boolean {
  return lifeTimeLeft(lifeTime, timerStartAt) > 0
}

export function getMonthPeriodString(
  dateStart: string,
  dateEnd: string,
  language: string = 'en',
  format: string = STANDARD_DATE_FORMAT
) {
  const momentLanguage = moment().locale(language?.toLowerCase() || 'en')
  const monthsNames = momentLanguage.localeData().months()
  const startDate = moment(dateStart, format)
  const endDate = moment(dateEnd, format)
  const startDay = startDate.date()
  const startMonth = monthToGenitive(monthsNames[startDate.month()], language)
  const endDay = endDate.date()
  const endMonth = monthToGenitive(monthsNames[endDate.month()], language)
  const startDateString =
    startMonth === endMonth ? startDay : `${startDay} ${startMonth}`
  return `${startDateString} - ${endDay} ${endMonth}`
}

export const getAgeFromBirthday = (birthdate: string) => {
  return moment().diff(birthdate, 'years')
}

export const dateObjectToString = (
  date: Date,
  format: string = STANDARD_DATE_FORMAT
) => {
  return moment(date.valueOf()).format(format)
}

export const toNextMonth = (
  date: Date,
  format: string = STANDARD_DATE_FORMAT
) => {
  return moment(date.valueOf()).add(1, 'month').format(format)
}

export const toEndOfMonth = (
  date: Date,
  format: string = STANDARD_DATE_FORMAT
) => {
  return moment(date.valueOf()).endOf('month').format(format)
}

export function monthToGenitive(month: string, language: string) {
  if (language.toLowerCase() === 'ru') {
    if (month.endsWith('ь') || month.endsWith('й')) {
      return month.slice(0, -1) + 'я'
    }
    return month + 'a'
  }
  return month
}
