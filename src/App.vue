<template>
  <div id="app" style="overflow: hidden">
    <router-view/>
    
  </div>
</template>
<script>
import Modal from '@/components/login/Modal'
import Conf from '@/config'
import axios from 'axios'
export default {
  name: 'App',
  components: {
    Modal
  },
  data() {
    return {
      userInfo: {},
      cols: [{ name: 'Name' }, { name: 'Email' }, { name: 'Description' }],
      userName: this.$store.state.user.userName
    };
  },
  methods: {
    refreshToken: function() {
      this.userName = this.$store.state.user.userName;
      let self = this;
      // this.$http.get('/Tokens/', { withCredentials: true }).then(
      //  res => {
      //    var timer = setTimeout(self.refreshToken, 50 * 60 * 1000);
      //    self.timer = timer;
      //  },
      //  err => {
          // this.$checkToken(err.response.status);
      //    var timer = setTimeout(self.refreshToken, 50 * 60 * 1000);
      //    self.timer = timer;
      //  }
      // );
    },
    getUserInfo: function() {
      this.userName = this.$store.state.user.userName;
    },
    handleCommand(command) {
      let self = this;
    //  self.$store.commit('setLoading');
      if (command == 'dropdownProfile') {
        this.$router.push({
          name: 'UserInfo'
        });
      } else if (command == 'dropdownLogout') {
        axios
          .delete(
            Conf.SSOUrl +
              '/auth?redirectUri=' +
              window.location.href.split('#')[0]
          )
          .then(response => {
            setTimeout(function() {
              window.location.reload();
            }, 1000);
            // self.$store.commit('setLoading');

            if (Conf.mode === 'development') {
              this.$cookie.delete('EIName');
            }
            setTimeout(function() {
              self.$store.commit('setFinish');
            }, 4000);
            this.$store.commit('setLogOut');
            this.$store.commit('setUser', {});
            this.$router.push({
              name: 'Login'
            });
          })
          .catch(function(error) {
            console.error(error);
               self.$store.commit('setFinish');
          });
      }
    }
  },
  mounted: function() {
    this.getUserInfo();
    // this.$checkLogin();
  },
  watch: {},
  created: function() {
    // this.$checkLogin();
    if (Conf.mode !== 'development') {
     // this.refreshToken();
    }
  },

  beforeDestroy: function() {
    clearTimeout(this.timer);
  }
};
</script>
<style >

  
 html {
        /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
        -ms-overflow-style:none;
        /*火狐下隐藏滚动条*/
        overflow:hidden;
    }

 
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
 
  height: 106%;
  -ms-overflow-style: none;
    overflow: auto;
    position:relative
}
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none){
  #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
   margin-top: 50px;
  height: 106%;
    position:relative;

    
 }

}
.fix-header {
  background-color: #232426;
  margin: 0px;
}

.navbar-right img {
  height: 30px;
  width: 42px;
  margin: 10px 10px 10px 0px;
  padding-left: 10px;
  border-left: 2px solid white;
  color: black;
}

.fix-header span {
  line-height: 50px;
  margin: 10px;
  color: black;
  font-size: 25px;
}

li img:hover {
  cursor: pointer;
}

.link:hover {
  cursor: pointer;
}

.loading-mask {
  position: fixed;
  z-index: 10000;
  background-color: hsla(0, 0%, 100%, 0.9);
  /* margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  width:80%;
  height:80%;
  top:16%;
  transition: opacity 0.3s;
  display: block;
}

.loading-mask .loading-spinner {
  top: 50%;
  width: 100%;
  text-align: center;
  position: absolute;
}

.loading-mask .loading-spinner .circular {
  width: 50px;
  height: 50px;
  animation: loading-rotate 2s linear infinite;
}

.loading-spinner .path {
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  stroke: #20a0ff;
  stroke-linecap: round;
}

.navbar-header {
  line-height: 50px;
}
.navbar-header img {
  height: 40px;
  padding: 10px 0;
}

.button {
  background-color: #707377;
  border: 2px solid #707377;
  color: white;
  border-radius: 4px;
}
.button:hover {
  background-color: #585b5e;
}
.borderType {
  border-radius: 5px;
}
.el-dropdown-menu {
  min-width: 150px;
}
.borderType:hover {
  background-color: #424141;
}
/*.borderType:hover {
background-color: #5d6166;
}*/
</style>
