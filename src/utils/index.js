export default {
  install (Vue) {
    Vue.prototype.toDatetime = (value) => {
      var today = new Date().getTime()
      if (today >= value) {
        return '请续费后使用...'
      } else {
        return Vue.prototype.datetime(value)
      }
    }
    Vue.prototype.datetime = (value) => {
      var date = new Date(value)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    }
  }
}
