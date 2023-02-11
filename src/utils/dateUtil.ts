import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm'
const DATE_FORMAT = 'YYYY-MM-DD '

export function formatToDateTime(date: dayjs.ConfigType = null, format = DATE_TIME_FORMAT): string {
    return dayjs(date).format(format)
}

export function formatToDate(date: dayjs.ConfigType = null, format = DATE_FORMAT): string {
    return dayjs(date).format(format)
}

export const dateUtil = dayjs