<template>
  <div style="width: 100%;height: 6%;background-color: #2c3e50;">
      <el-header style='height:6%;margin:0 auto;background-color:#2c3e50;color:#fff;width:100%'>
        <div style='display:inline-block;float:left;overflow:hidden;'>
            <img style="width:50%;height:auto;" src="@/assets/image/devicecloud.svg">
        </div>
        <div style='margin-left:75%;'>
            <el-dropdown style='color:#fff;margin-top:4%;'>
                <span class="el-dropdown-link">{{$store.state.user.name}}
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <span style="width:100%;height:100%;" v-on:click="getuserinfo">
                    <el-dropdown-item divided v-on:click.native='introduce'>
                     {{i18n.messages[$store.state.localLang].message.account}}
                    </el-dropdown-item></span>
                    <span v-on:click="logout">
                    <el-dropdown-item divided >
                       {{i18n.messages[$store.state.localLang].message.logout}}
                    </el-dropdown-item></span> 
                </el-dropdown-menu>
            </el-dropdown>
            <el-select id="icon" type="select" placeholder="" :onChange="changelang(current)" v-model="current" style="width:40%;positon:relative;top:10px;float:right;margin-right:10%;">
                <el-option :value="index" v-for="(item,index) in images" :key="index">
                <img :src="item.src" alt="error" style="width:20px;height:auto;"><span>{{item.name}}</span>
                </el-option>
            </el-select>
            <div style="position:relative;width:100px;height:20px;left:57%;top:-20px;">
                <div v-for="(item,index) in images" :key="index" style="width:100px;" >
                  <p style="margin:0;"> 
                    <img :src="item.src" alt="error" style="width:40px;height:auto;z-index:999;background:white"  v-if="''+current === ''+index">
                    <span style="color:black;text-align:center;" v-if="''+current === ''+index" >{{item.name}}</span>
                  </p>
                </div>
            </div>
            <!-- <el-dropdown style='padding-left:10px;color:#fff;'> -->
                <!-- <span class="el-dropdown-link">
                    <img src='@/assets/image/language/en.png' style='width:45px;height:25px;'/>
                    EN
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item divided>
                        <img src='@/assets/image/language/en.png' style='width:45px;height:25px;'/>
                        EN
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <img src='@/assets/image/language/ch.png' style='width:45px;height:25px;'/>
                        简体中文
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <img src='@/assets/image/language/ch.png' style='width:45px;height:25px;'/>
                        繁体中文
                    </el-dropdown-item > -->
                    <!-- <el-dropdown-item divided>
                        <img src='@/assets/image/language/rb.png' style='width:45px;height:25px;'/>
                        にっしょうき
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <img src='@/assets/image/language/hg.png' style='width:45px;height:25px;'/>
                        태극기
                    </el-dropdown-item>
                    <el-dropdown-item divided>
                        <img src='@/assets/image/language/ey.png' style='width:45px;height:25px;'/>
                        ру́сский язы́к
                    </el-dropdown-item> -->
                <!-- </el-dropdown-menu> -->
            <!-- </el-dropdown> -->
        </div>   
      </el-header>
  </div>
</template>

<script>
import axios from 'axios'
import qs from 'qs'
import Conf from '@/config'
 export default {
   data () {
     return {
      lang:['en','zh_tw','zh_cn'],
      images:[
        {src:require('@/assets/image/language/en.png'), name:'EN'},
        {src:require('@/assets/image/language/ch.png') ,name:'繁体中文'},
        {src:require('@/assets/image/language/ch.png'),name:'简体中文'}
      ],
      current: '0',
      i18n: this.$i18n
     }
   },
   methods:{
    logout: function () {
      this.$router.push({
        path:'/'
      })
      this.$store.commit('setLogOut')
    },
    changelang: function (index){
      console.log(this.$i18n)
      this.$i18n.local = this.lang[index]
      this.$store.commit('changelang', this.lang[index])
      window.localStorage.setItem('language', this.lang[index])
    },
    introduce: function () {
    },
    getuserinfo: function () {
    //   let obj = {'token':''} 
    //   obj.token = this.$store.state.token.EIToken
    //   console.log(obj)
      // axios.post( Conf.SSOUrl +'/tokenvalidation',qs.stringify(obj))
      // https://portal-sso.wise-paas.com.cn/v1.5/auth/native
    //   axios.post('https://portal-sso.wise-paas.com/v1.5/tokenvalidation', qs.stringify(obj)) 
    //   .then(response => {
    //       console.log(response)
    //   })
    //   .catch(error => {
    //       console.log(error)
    //   })
      this.$router.push({
        path:'/UserInfo'
      })
    }
   },
   components: {

   }
 }
</script>

<style>

 
</style>
