export const getTimeString = (dateStart: Date, dateEnd: Date) => {
  const passed = Number(dateEnd) - Number(dateStart)

  const minutes = Math.floor(passed / 60000)

  const secondesLeft = passed - minutes * 60000

  const secondes = Math.floor(secondesLeft / 1000)

  return `${minutes >= 10 ? minutes : '0' + minutes} : ${
    secondes >= 10 ? secondes : '0' + secondes
  }`
}
