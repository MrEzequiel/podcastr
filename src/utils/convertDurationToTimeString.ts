const convertDurationToTimeString = (duration: number): string => {
  const hours = Math.floor(duration / 3600)
  const minutes = Math.floor((duration % 3600) / 60)
  const seconds = duration % 60

  const formated = [hours, minutes, seconds]
    .map(value => value.toString().padStart(2, '0'))
    .join(':')

  return formated
}

export const convertTimeStringToNumber = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}

export default convertDurationToTimeString
