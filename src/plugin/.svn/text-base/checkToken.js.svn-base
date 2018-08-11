export default {
  install: function (Vue) {
    Vue.prototype.$checkApiError = function () {
      this.isErr = true
      this.errMsg = 'Request is timeout.'
      this.$store.commit('setFinish')
    }
  }
}
