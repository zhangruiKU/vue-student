export default {
  timeHandler() {
    let resultTime = new Date()
    const year = resultTime.getFullYear()
    const month = resultTime.getMonth() + 1
    const day = resultTime.getDate()
    let hour = resultTime.getHours()
    if (hour === 0) {
      hour = '0' + hour
    }
    let minute = resultTime.getMinutes()
    if (minute.toString().length === 1) {
      minute = '0' + minute
    }
    resultTime = `${year}-${month}-${day} ${hour}:${minute}`
    return resultTime
  },
}