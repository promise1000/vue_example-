<template>

  <div class="navbar navbar-fixed-top fix-header">
    <div id="particles-js">
 
    </div>
    <div id="login-wrapper">
      <div id="login-box-first">
        <img id="topleft-logo-first" class="img-responsive" src="@/assets/image/wise-paas-logo.svg" />
        <div id="center-logo-wrapper-first">
          <img style="width: 80%;height: auto;margin-top: 6%;" class="img-responsive" src="@/assets/image/devicecloud.svg">
        </div>
        <div id="login-message-first" :class="{errMsg: isErr||!canAccess}">{{message}}</div>
        <div id="login-form-first" :class="{errMsg: isErr}">
          <input id="login-username-first" type="text" class="form-control" placeholder="User name" v-model="account">
          <input id="login-pwd-first" type="password" class="form-control" placeholder="Password" v-model="password">
        </div>
        <div id="login-rememberme-first">
          <input id="login-rememberme-first" type="checkbox" v-model="rememberMe">
          <span id="login-rememberme-first">Remember me</span>
        
        </div>
        <div id="login-forgetpwd-first">
          <p>Forget password?</p>
        </div>
        <div id="login-btn-first" @click="login">
          <span style="color:white">Sign in</span>     
        </div>
      </div>
    </div>
    <Modal v-if="addVisible" headerColor="#6084A8" :width="620" :height="60">
      <div slot="header">
        Modify Password
      </div>
      <div slot="body">
        <table class="table-setting">
          <tbody>
            <tr>
              <td>{{$t('password')}}</td>
              <td>
                <input type="password" class="form-control" :class="{errMsg: oldPwdErr}" v-model="passwordTemp.password" />
              </td>
            </tr>
            <tr>
              <td>{{$t('newpassword')}}</td>
              <td>
                <input type="password" class="form-control" :class="{errMsg: newPwdErr}" v-model="passwordTemp.newpassword" title="                           
                1.Must be 8-20characters in length           
  2.Must contain at least one uppercase letter
  3.Must contain at least one lowercase letter
  4.Must contain at least one number
  5.Must contain at least one character !@#$%^&()"/>
              </td>
            </tr>
                <tr>
              <td>{{$t('cellphone')}}</td>
              <td>
                <input type="text" class="form-control" :class="{errMsg: phoneErr}" v-model="passwordTemp.cellphone" v-on:keypress="isNumber(event)"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div slot="left-footer">
        <span style="color:red;" v-show="oldPwdErr||newPwdErr||phoneErr||isErr">[Error]</span>
        <span style="color:red;" v-show="oldPwdErr||newPwdErr||phoneErr||isErr">{{errMsg}}</span>
      </div>
      <div slot="right-footer">
        <button class="btn btn-borderless" @click="handleOkClick">
          <i class="glyphicon glyphicon-saved fa-lg"></i>
        </button>
        <button class="btn btn-borderless" @click="handleCancelClick">
          <i class="fa fa-times fa-lg"></i>
        </button>

      </div>

    </Modal>
    <Modal v-if="errorVisible" headerColor="#a34b4b" :width="500" :height="50">
      <div slot="header">
        <span class="glyphicon glyphicon-exclamation-sign" style="padding-right:10px;"></span>Error
      </div>
      <div style="font-size:16px" slot="body" v-html="errStr">

      </div>
      <div slot="left-footer">
      </div>
      <div slot="right-footer">
        <button class="btn btn-borderless" @click="errorVisible=false">
          <i class="glyphicon glyphicon-saved fa-lg"></i>
        </button>
      </div>
    </Modal>
  </div>

</template>
<script>

import Conf from '@/config';
import axios from 'axios';
import qs from 'qs'
import Modal from '@/components/login/Modal';
import { Notification } from 'element-ui';
export default {
  name: 'Login',
  
  data() {
   
    return {
      passwordTemp: {},
      canAccess: true,
      account: null,
      password: null,
      addVisible: false,
      isErr: false,
      errMsg: '',
      message: 'Sign in to Machine Cloud Platform',
      rememberMe:
        this.$localStorage.get('account') && this.$localStorage.get('password'),
      oldPwdErr: false,
      newPwdErr: false,
      confirmPwdErr: false,
      phoneErr: false,
      event: null,
      setTime: 30000,
      errorVisible: false,
      isErr:false
    };
  },

  methods: {
    login() {

      let self = this;
        this.oldPwdErr = this.newPwdErr = this.confirmPwdErr = this.phoneErr = this.isErr = false;
     
      this.$store.commit('setLoading');

     // if(Conf.mode === 'development'){
     if (!Conf.ValidSSO && Conf.mode === 'development') {
       
        let user = {
          userName: 'development mode',
          email: 'development mode',
          ssoRole: 'development mode',
          userDesc: 'development mode',
          createUser: 'development mode',
          scope: ['get_value', 'edit_value', 'edit_config', 'manage_account']
        };
        this.$cookie.set('EIName', Conf.mode);
        this.$store.commit('setUser', user);
        this.$store.commit('setLogin');
        this.$router.push({
          name: 'ProjectList'
        });
      } else {
   
        if (!this.account && !this.password) {
          this.isErr = true;
          this.message = 'Please enter your email and password';
          this.$store.commit('setFinish');
        } else if (!this.account) {
          this.isErr = true;
          this.message = 'Please enter your email';
          this.$store.commit('setFinish');
        } else if (!this.password) {
          this.isErr = true;
          this.message = 'Please enter your password';
          this.$store.commit('setFinish');
        } else {
      
          let obj = {
            username: this.account,
            password: this.password,
            redirectUri:'/#/welcome'
            // 'https://portal-sso.wise-paas.com/web/redirctPage.html' 
            // 
          };
          this.$store.state.user.name = this.account
          this.$store.state.user.password = this.password
          // console.log("before axios" + Conf.SSOUrl)

          this.$store.commit('setLoading')
          // this.$router.push({path:'/welcome'})
          axios
            // .post(Conf.SSOUrl + '/auth', obj)
            .post('getAuthFromNode', qs.stringify(obj))
            .then(response => {
              // console.log(response.data)
              this.$store.commit('setToken', response.data)
               this.$store.commit('setLogin')
               //this.localStorage.setItem('mydata',JSON.stringify(response.body.data))
               this.$router.push({path:'/createnode'})
               axios.get('users/en/admin')
                 .then(res=> {
                  //  console.log(res)
                   this.$store.state.Account = res.data
                   if(this.$store.state.Account.orgid === null){
                     this.$store.state.Account.orgid == 1
                   }
                 })
                 .catch(err => {
                   console.log(err)
                 })
               if (response.data.status === 'locked') {              
                 this.errMsg = '';
                 self.passwordTemp.cellphone=self.passwordTemp.newpassword=self.passwordTemp.password=''
                 this.addVisible = true;
                 this.$store.commit('setFinish')
               } else {
         
                if (this.rememberMe) {
                  this.$localStorage.set('account', this.account)
                  this.$localStorage.set('password', this.password)
                }
                this.$store.commit('setFinish');
                this.$store.commit('setLogin');
                // console.log(this.$store.state.token)
               }               
            })
            .catch(error => {
              if ( !error.response ) {
              //  self.$checkError();
              } else {
                this.isErr = true;
                this.message = error.response.data.message;
              }
               this.$store.commit('setFinish')
            })
        }
      
      }
    },
    handleCancelClick() {
      this.addVisible = this.isErr = false;
    },
    handleOkClick() {
      this.oldPwdErr = this.newPwdErr = this.confirmPwdErr = this.phoneErr = this.isErr = false;
      if (!this.passwordTemp.password) {
        this.oldPwdErr = true;
        this.errMsg = 'password can not be empty';
        return;
      }
      this.errMsg = this.isPasswordValid(this.passwordTemp.newpassword);
      if (this.errMsg) {
        this.newPwdErr = true;
        return;
      }
      if (!this.passwordTemp.cellphone) {
        this.phoneErr = true;
        this.errMsg = 'Phone can not be empty';
        return;
      }

      let url = Conf.SSOUrl + '/users/' + this.account + '/password';
      let obj = {
        password: this.passwordTemp.password,
        new_password: this.passwordTemp.newpassword,
        contactPhone: this.passwordTemp.cellphone
      };
    
      this.$store.commit('setLoading');
      axios
        .patch(url, obj)
        .then(res => {
          // this.$store.commit('setFinish');
          this.addVisible = false;
          this.password = this.passwordTemp.newpassword;
          this.login();
        }, err => {        
          if (!err.response) {            
          //  this.$checkError();
          } else {           
          this.isErr = true;          
          this.errMsg = err.response.data.message;
          this.$store.commit('setFinish');
        }}
      ).catch(error => {
          this.$checkApiError();
        });
    },
    isPasswordValid(value) {
      let pattern2 = /^(?=.*?[A-Z]).{8,20}$/;
      let pattern3 = /^(?=.*?[a-z]).{8,20}$/;
      let pattern4 = /^(?=.*?[0-9]).{8,20}$/;
      let pattern5 = /^(?=.*[!\u0022#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,20}$/;

      if (value.length < 8 || value.length > 20) {
        return 'length should be 8 to 20';
      } else if (!pattern2.test(value)) {
        return 'Must contain at least one uppercase letter';
      } else if (!pattern3.test(value)) {
        return 'Must contain at least one lowercase letter';
      } else if (!pattern4.test(value)) {
        return 'Must contain at least one number';
      } else if (!pattern5.test(value)) {
        return 'Must contain at least one character !@#$%^&()';
      } else {
        this.oldPwdErr = this.newPwdErr = this.confirmPwdErr = false;
      }
    },
    isNumber(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    }
  },
  components: {
    Modal
  },
  mounted() {
    // if (this.$cookie.get('EIName')) { 
    //   // this.$store.commit('setLoading');
    //   // this.checkToken();
    // } else if (         
    //   this.$localStorage.get('account') &&
    //   this.$localStorage.get('password')
    // ) {
    //   this.account = this.$localStorage.get('account');
    //   this.password = this.$localStorage.get('password');
    // }
  },
  watch: {
    'passwordTemp.passwordTemp.password'() {
      this.errMsg = this.isPasswordValid(this.passwordTemp.password);
      this.newPwdErr = this.errMsg ? true : false;
    },
    'passwordTemp.newpassword'() {
      this.errMsg = this.isPasswordValid(this.passwordTemp.newpassword);
      this.newPwdErr = this.errMsg ? true : false;
    }
  }
};
</script>

<style scoped>

table.table-setting td:first-child {
  width: 30% !important;
}
/*.navbar {
  background-image: url(../assets/1.png);
  background-size: cover;
}*/
.content {
  height: 100%;
}
#login-btn-first:hover {
  background-color: #99caff;
}

#login-message-first.errMsg {
  color: red;
}

#login-form-first.errMsg input {
  border-color: red;
  color: red;
}

.fix-header {
  background-color: white;
}
.fix-header span{
  margin:0px
}
.errMsg {
  border-color: red;
  color: red;
}
</style>
<style>
.el-notification.right {
  background: #fceded;
}
</style>