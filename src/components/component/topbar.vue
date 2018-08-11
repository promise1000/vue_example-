<template>
  <div style='width:100%'>
    <el-container style='width:100%;height:99%;'> 
      <el-header class='topbar' style=''>
        <div style='margin-bottom:5px;'>
          <History/>
        </div>
        <div class='barcontainer' style=''>
          <el-button-group>
            <el-button icon='el-icon-circle-check' v-on:click.stop='operation'  size="small" style='width:150px;'></el-button>
            <el-button size="small"  v-on:click.native='canceltext'  icon="el-icon-refresh" style='width:150px;'></el-button>
            <el-button v-on:click.stop='del' size="small"  icon="el-icon-delete" style='width:150px;' v-show="this.$store.state.isShow"></el-button>
          </el-button-group>  
          <el-button-group style=''> 
            <el-popover title="Select Template" placement="bottom-start" width="1000" height="500" v-model="visible1" >
            <div style='width:500px;margin-left:20%;display:inline-block;position:absolute;top:1%'>
              <!-- <el-input placeholder="请输入内容" v-model="input" style='width:45%' > -->
                <i slot="suffix" class="el-icon-search" style='cursor:pointer'></i>
              <!-- </el-input> -->
            </div>
              <div style='width:450px;margin:0 auto;display:inline-block'>
                <div style='height:500px;overflow:auto;border:1px solid #C0C4CC'>
                  <ul>
                      <li class='nodetemplate' v-for="(key,index) in $store.state.nodetem.groupnode" :key="index" :class="{active:index==isActive}"
                      @click="sendTemplate(key.id,index)">
                        <!-- <img :src="key.image" alt=""> -->
                          <span>
                            {{key.name}}
                          </span>
                      </li>
                  </ul> 
                </div>
                <div style="text-align:left;margin-top:5px">
                  <el-button icon="el-icon-close" size="mini" type="" @click="visible1 = false"></el-button>
                  <el-button icon="el-icon-check" type="primary" size="mini" @click="nodetemp"></el-button>
                </div>
              </div>
               <div style='display:inline-block;overflow:hidden;width:500px;height:500px;border:1px solid #C0C4CC;margin-left:20px;position:absolute'>
                 <div style='text-align:center;margin:10px'>Node Template Detail</div>
                  <template>
                      <el-table
                        :data="temGroupDetail"
                        height="100%"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="DisplayName"
                          label="参数名称"
                          width="185">
                        </el-table-column>
                        <el-table-column
                          prop="Desc"
                          label="参数描述">
                        </el-table-column>
                      </el-table>
                    </template>
               </div>
               
              <el-button size="small" slot="reference" @click="addnode"  icon="el-icon-plus" style='width:120px;' v-show="this.$store.state.isShow">Node</el-button>
            </el-popover>
            
            <el-popover title="Select Equipment" placement="bottom-start" width="1000"   v-model="visible2" >
            <div style='width:500px;margin-left:20%;display:inline-block;position:absolute;top:1%'>
              <!-- <el-input placeholder="请输入内容" v-model="input1" style='width:45%;' > -->
                <i slot="suffix" class="el-icon-search" style='cursor:pointer'></i>
              <!-- </el-input> -->
            </div>
              <div style='width:450px;margin:0 auto;display:inline-block'>
                <div style='height:500px;overflow:auto;border:1px solid #C0C4CC'>
                  <ul>
                      <li class='nodetemplate' v-for="(key,index) in $store.state.equipnode" :key="index" :class="{active:index==isActive}" @click="equipgroup(key.equiptypeid,index)">
                        <span>{{key.name}}</span>
                      </li>
                  </ul> 
                </div>
                <div style="text-align:left;margin-top:5px">
                  <el-button icon="el-icon-close" size="mini" type="" @click="visible2 = false"></el-button>
                  <el-button icon="el-icon-check" type="primary" size="mini" @click="equiptemp"></el-button>
                </div>
              </div>
              <div style='display:inline-block;overflow:hidden;width:500px;height:500px;border:1px solid #C0C4CC;margin-left:20px;position:absolute'>
                 <div style='text-align:center;margin:10px'>Equipment Template Detail</div>
                  <template>
                      <el-table
                        :data="temGroupEquip"
                        height="100%"
                        border
                        style="width: 100%">
                        <el-table-column
                          prop="equipparam"
                          label="参数名称"
                          width="185">
                        </el-table-column>
                        <el-table-column
                          prop="equipparamdesclang"
                          label="参数描述">
                        </el-table-column>
                      </el-table>
                    </template>
               </div>
              <el-button size="small" slot="reference" @click="addequipment" icon="el-icon-plus" style='width:150px;' v-show="this.$store.state.isShow">Equipment</el-button>
            </el-popover>
              
          </el-button-group>
        </div>   
        
      </el-header>
    </el-container>
  </div>
</template>

<script>
 import History from './history.vue'
 import bus from '../../assets/js/bus.js'
 import axios from 'axios'
 export default {
   name:'topbar',
   data () {
     return {
       visible1:false,
       visible2:false,
       isActive:0,
       msg:'默认值',
       input:'',
       input1:'',
       i18n: this.$i18n
     }
   },
   components:{
     History
   },
    methods:{
        /**↓↓↓↓↓ ↓↓↓↓↓***↓↓↓↓↓**************************************************************  by xierong ***************************************************************************** **/
      nodetemp: function () {
        let self = this
        this.visible1 = false
        this.$store.commit('onNodeType','Org')
        this.$store.commit('create','Org')
      },
      equiptemp: function () {
        this.visible2 = false
        this.$store.commit('onNodeType','equipment')
        this.$store.commit('create','equipment')
      },
      // 点击save按钮进行的操作
      operation:function () {
        let self = this
        this.$store.commit('isshow',true)
        let data = this.$store.state.template.render
        let data1 = this.$store.state.template.common.Basicparam
        for(let n =0; n<data1.length; n++){
          if(data1[n].errormsg != ''){
            self.$store.commit('saveflag')
          }
        }
        for( let k in data ){
        //  console.log(key)
          if(k != 'test'){
            for(let j=0;j<data[k].length; j++){
              console.log(data[k][j].errormsg)
              if(data[k][j].errormsg != ''){
                self.$store.commit('saveflag')
              }
            }
          }
        }
        // alert('save:'+this.$store.state.saveflag+'change:'+this.$store.state.changeflag)
        if(this.$store.state.saveflag && this.$store.state.changeflag){
          this.$store.commit('save')
        }else if(!self.$store.state.changeflag){
        }else{
          self.$alert('Please check your input', '', {
            confirmButtonText: 'close',
            callback: action => {
              this.$message({
                type: 'info',
                message: `action: ${ action }`
              })
            }
          })
        }
      },
      /** ↑↑↑↑***↑↑↑↑***↑↑↑↑****↑↑↑↑*******************************************************  by xierong ***************************************************************************** **/

    //  delete删除操作
     del() {  
       this.$store.commit('delete')       
        // this.$confirm('This operation will permanently delete the node and the following sub-node, continue?', 'Remind', {
        //   confirmButtonText: 'Ok',
        //   cancelButtonText: 'cancel',
        //   type: 'warning'
        // }).then(() => {
        //   //  this.$store.commit('delete')
        //    bus.$emit("delData","删除")
        //   this.$message({ 
        //     type: 'success',
        //     message: 'Deleted Successfully!'
        //   });
        // }).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: 'Undelete'
        //   });          
        // });
     },
     canceltext:function(){
       this.$store.commit('edit')
     },
    // 添加node模板
    addnode() {
      axios.get('orgnode_tmpls/0/en')
      .then(response => {
        let nodedata=response.data
        let nodeTemId=nodedata[0].id
        this.$store.commit('getNodeGroup',nodedata)
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        } else {
          // 返回错误信息
          this.isErr = true
          this.message = error.response.data.message
        }
      })
    },
    //  添加equipment版本
    addequipment:function(){
      axios.get('equiptemplates/en/0')
      .then(response => {
        let equipdata=response.data
        let equipTemId=equipdata[0].id
        this.$store.commit('addequipment',equipdata)
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        } else {
          // 返回错误信息
          this.isErr = true
          this.message = error.response.data.message
        }
      })
    },
    equipgroup:function(id,index){
      this.isActive=index
      this.$store.commit('changeequipid', id)
      this.$store.commit('equipIndex',index)
      axios.get('equiptemplates/zh_cn/findone/' + id)
      .then(response => {
        this.$store.commit('onTemGroupEquip', response.data)
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        } else {
          // 返回错误信息
          this.isErr = true
          this.message = error.response.data.message
        }
      })
    },
    sendTemplate:function(id,index){
      this.isActive=index
      this.$store.commit('groupId',id)
      this.$store.commit('groupIndex',index) 
      axios.get('orgnode_tmpls/findone/' + id +'/en')
      .then(response => {
        this.$store.commit('onOrgTemplateDetail', response.data)
      })
      .catch(error => {
        if (typeof error.response === 'undefined') {
        } else {
          // 返回错误信息
          this.isErr = true
          this.message = error.response.data.message
        }
      })   
    }
    
   },
  
  computed: { 
     temGroupDetail:function(){
        return this.$store.state.temGroupDetail
      },
    temGroupEquip:function(){
      return this.$store.state.temGroupEquip
    }
  },
 }
</script>

<style scoped>
 .nodetemplate{
   border-top: #EBEEF5 1px solid;
   cursor:pointer;
   margin:20px 0 0 20px;
 }
 .active{
    color:#ffd04b;
    font-weight: bold;
    background: #c1c1c1;
    height: 40px;
    padding-top: 10px;
  }

</style>
