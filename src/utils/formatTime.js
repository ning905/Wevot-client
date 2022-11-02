import dayjs from 'dayjs'

export function eventItemFormatTime(time) {
  return dayjs(new Date(time)).format('DD MMM YYYY')
}

export function eventPageFormatTime(time) {
  const T = dayjs(new Date(time))
  if (T.get('minute') === 0) {
    return T.format('DD MMM · ha')
  }
  return T.format('DD MMM · h:mma')
}

export function slotStartFormatTime(time) {
  const T = dayjs(new Date(time))
  if (T.get('year') === dayjs().year()) {
    return T.format('DD MMM HH:mm')
  }
  return T.format('DD MMM YYYY HH:mm')
}

export function slotEndFormatTime(start, end) {
  const startTime = dayjs(new Date(start))
  const endTime = dayjs(new Date(end))
  if (endTime.get('year') === startTime.get('year')) {
    if (
      endTime.get('month') === startTime.get('month') &&
      endTime.get('day') === startTime.get('day')
    ) {
      return endTime.format('HH:mm')
    }
    return endTime.format('DD MMM HH:mm')
  }
  return endTime.format('DD MMM YYYY HH:mm')
}
