
export default {
  install: function (Vue) {
    Vue.prototype.$checkError = function () {
      this.$notify.error({
        title: 'Error',
        position: 'bottom-right',
        duration: 3000,
        message:
          'The system is abnormal, please restart to recover to last normally start.'
      })
      this.$store.commit('setFinish')
    }
  }
}
