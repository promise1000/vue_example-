<template>
    <el-container style='width:70%;height:99%'> 
        <el-header class='topbar' style='height:8%'>
            <div style='margin-top:10px;'>
                <span style='margin-right:3%;'>New Node</span>
                <el-popover title="Choose Node Template" placement="bottom-start" width="1000" v-model="visible1" style='position:relative'>
                <div style='width:500px;margin-left:20%;display:inline-block;position:absolute;top:1%'>
                    <!-- <el-input placeholder="Please enter the query conditions" v-model="input10" style='width:60%' > -->
                        <i slot="suffix" class="el-icon-search" style='cursor:pointer'></i>
                    <!-- </el-input> -->
                </div>
                <div style='display:inline-block;width:500px;'>
                <div >
                    <div style='width:480px;height:500px;overflow:auto;border:1px solid #C0C4CC;margin-top:6%;position:relative'>
                    <div style='text-align:left;margin:10px;font-size:20px;'>Node Template List</div>
                    <ul >
                        <li class='nodetemplate' v-for="(item,index) in $store.state.nodetem.groupnode" :key="index" :class="{active:index==isActive}"
                            @click='addNode(item.id,index)'>
                            <!-- <img :src="key.image" alt=""> -->
                            <span>
                            {{item.name}}
                            </span>
                        </li>
                    </ul> 
                    </div>
                    <div style="text-align:left;margin-top:5px">
                    <el-button size="mini" type="text" @click="visible1 = false">Cancel</el-button>
                    <el-button type="primary" size="mini" @click="jumpcreate">OK</el-button>
                    </div>
                </div>
                </div>
                <!--模板详情  -->
                <div style='display:inline-block;overflow:hidden;width:450px;height:500px;border:1px solid #C0C4CC;position: absolute;margin-top:3%'>
                    <div style='text-align:left;margin:10px;font-size:20px;'>Node Template Detail</div>
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

                <el-button type="success" slot="reference" icon='el-icon-plus' @click='getTem' size="small" style='width:80px;' ></el-button>
                </el-popover>
            </div> 
        </el-header>
        <el-main>
            <div style='text-align:left;color:#2c3e50'>
                <h2>Welcome to use </h2>  
                <h2>Machine Cloud Management</h2>   
                <p>Looks like you haven't created a group, Create some groups click +</p>                
            </div>
        </el-main>
    </el-container>
</template>
<script>
    import axios from 'axios'
    export default {
        name:'welcome',
        data() {
            return {
                input:'',
                visible1:false,
                isActive:0,
                input10:'',
                id:''
            }
        },
        methods:{
                /**↓↓↓↓↓ ↓↓↓↓↓***↓↓↓↓↓**************************************************************  by xierong ***************************************************************************** **/
            jumpcreate: function () {
                this.$store.commit('setLoading')       
                let self = this
                let nodeid = this.$store.state.nodeId
                let equipid = this.$store.state.equipid      
                let url = 'orgnode_tmpls/findone/' + nodeid +'/en'
                axios.get(url)
                .then(response => {
                self.$store.commit('create','Org')
                self.$store.commit('onViewChange', false)
                this.$store.commit('setFinish')
                })
                .catch(error => {
                if (typeof error.response === 'undefined' && this.$store.state.template === '') {
                    this.$store.commit('changeerror',error)
                    this.$store.commit('setFinish')
                }
                })               
            },
            /** ↑↑↑↑***↑↑↑↑***↑↑↑↑****↑↑↑↑*******************************************************  by xierong ***************************************************************************** **/
            addNode:function(id,index){
                this.isActive=index
                this.$store.commit('groupId',id)
                this.$store.commit('groupIndex',index)
                axios.get('orgnode_tmpls/findone/' + id +'/en')
                .then(response => {
                    this.$store.commit('onOrgTemplateDetail',response.data)
                })
                .catch(error => {
                    if (typeof error.response === 'undefined') {
                    this.$store.commit('changeerror',error)
                    }
                })
                
            },
            getTem:function(){
             
                axios.get('orgnode_tmpls/0/en')
                .then(response => {
                let nodedata=response.data
                let nodeTemId=nodedata[0].id
                this.$store.commit('getNodeGroup',nodedata)
                })
                .catch(error => {
                if (typeof error.response === 'undefined') {
                    this.$store.commit('changeerror',error)
                }
                })
            }
        }, 
        computed:{
            temGroupDetail:function(){
                return this.$store.state.temGroupDetail
            }
        }
    }
</script>
<style scoped>
  *{
    overflow:hidden
  }
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
