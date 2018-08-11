export default {
  install: function (Vue) {
    Vue.prototype.$checkLogin = function () {
      if (process.env.NODE_ENV === 'production') {
        if (!this.$cookie.get('EIName')) {
          this.$store.commit('setLogOut')
          this.$cookie.delete('EIName')
          this.$cookie.delete('EIToken')
          this.$store.commit('setUser', {})
          this.$router.push({
            name: 'Login'
          })
        } else {
          let self = this
          this.$http.get('/Users/me').then(res => {
            self.$store.commit('setUser', res.data)
            self.$store.commit('setLogin')
          }, err => {
            console.log(err)
            if (typeof err.response === 'undefined') {
              this.$notify.error({
                title: 'Error',
                position: 'bottom-right',
                duration: 3000,
                message:
                  'The system is abnormal, please restart to recover to last normally start.'
              })
            }
            self.$store.commit('setLogOut')
            self.$cookie.delete('EIName')
            self.$cookie.delete('EIToken')
            self.$store.commit('setUser', {})
            self.$router.push({
              name: 'Login',
              params: err.response ? { statusCode: err.response.status } : {}
            })
          })
        }
      } else {
        let self = this
        this.$http.get('/Users/me').then(res => {
          console.log(res)
          self.$store.commit('setUser', res.data)
          self.$store.commit('setLogin')
        }, err => {
          console.log(err)
          self.$store.commit('setLogOut')
          self.$cookie.delete('EIName')
          self.$cookie.delete('EIToken')
          self.$store.commit('setUser', {})
          self.$router.push({
            name: 'login',
            params: { statusCode: err.response.status }
          })
        }
        )
      }
    }
  }
}
