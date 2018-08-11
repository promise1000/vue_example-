<template>
  <div class='leftList' style=' overflow:auto'>
    <el-aside width="99%" style="background-color:#2c3e50;">           
      <div id='leftAside'>
        <el-menu
        :default-active="menuActive"
        class="el-menu-vertical-demo"
        :unique-opened="true"
        :default-openeds="cacheMenu"
        background-color="#2C3E50"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>Account</span>
          </template>
          <el-menu-item index="1-1">
            <i class="el-icon-tickets"></i>
            <span v-on:click="getuserinfo" >User Profiles</span>
          </el-menu-item>           
        </el-submenu>
        <el-submenu index="2" 
         @click.stop.native="selectmanage('2','Device Management','2')">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title" :style="{color:'node#-2' === templateActive?'#ffd04b':'#fff'}" >Device Management</span>
          </template>
          <Menus :listData="list" :indexM="'2'"/>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">Device Monitor</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-tickets"></i>
            <span>Online Library</span>
          </el-menu-item>          
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">System Setting</span>
          </template>
          <el-menu-item index="4-1">
            <i class="el-icon-tickets"></i>
            <span>Template Library</span>
          </el-menu-item>
          <el-menu-item index="4-2">
            <i class="el-icon-tickets"></i>
            <span>Customize</span>
          </el-menu-item>   
          <el-menu-item index="4-3">
            <i class="el-icon-question"></i>
            <span>Help</span>
          </el-menu-item>  
          <el-menu-item index="4-4">
            <i class="el-icon-info"></i>
            <span>Version</span>
          </el-menu-item>                              
        </el-submenu>  
        </el-menu>

      </div>
    </el-aside>
  </div>
</template>

<script>
 import bus from '@/assets/js/bus.js' 
 import Menus from '@/components/component/menus.vue'
 import axios from 'axios'
 export default {
   props:['dataname','data'],
   components:{
     Menus
   },
   data () {
     return {
      a:true,
      defaultProps: {
        children: 'Children',
        label: 'Name',
        logo:'Logo'
      }
     }
   },
   computed:{
     menuActive(){
       return this.$store.state.menuActive
     },
     cacheMenu(){
       return this.$store.state.cacheMenu
     },
     list () {
       return this.$store.state.leftdata
     },
    templateActive(){
      return this.$store.state.templateActive
    }
   },
   beforeMount:function(){
      axios.get('orgnodes/0/en')
      .then(response => {
        this.$store.commit('leftData',response.data)
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        }
      })
   },
   methods:{
     selectmanage(index,name,id){
      let tagnodemsg = {Lev:1,
        TmplTypeId:1,
        ParentOrgId:0,
        PreSiblingOrgId:0,
        Owner:1
      }
      this.$store.commit('tagNodeMsg', tagnodemsg)
      this.$store.commit('leftid', '0')
      this.$store.commit('addHistorys','')
      this.$store.commit('onTemplateActive','node#-2')
      this.$store.commit('topbardata',index)
      this.$store.commit('onNodeType','Org')
      this.$store.commit('onViewChange', true)
     },
     boxheight(){ 
        let  winHeight = document.documentElement.offsetHeight || document.body.offsetHeight ;
        document.querySelector('#leftAside>ul').style.height= winHeight-68 +"px";
    },
    getuserinfo: function () {
      this.$router.push({
        path:'/UserInfo'
      })
    }
   },
   mounted(){
     window.onload=this.boxheight
   }
 }
</script>

<style scoped>
  #leftAside>ul{
    overflow-y:auto;
  }
  html,body{
    height:100%;
  }
  .active{
    color:#ffd04b;
    font-weight: bold;
  }
</style>



 
