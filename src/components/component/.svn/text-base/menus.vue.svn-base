<template>
 <div>
    <template v-for="(item,index) in listData">
      <el-submenu v-if="item.nodetype=='Org'" :data="active(indexM+'e'+index,item.Id,item.Name,'Org')" :index="indexM+'e'+index" :key="index"
       @click.stop.native="selectinside(indexM+'e'+index,'node#'+item.Id,item.Name,item.Lev,item.TmplTypeId,item.Children,item.nodetype,item.ParentId)">
          <template slot="title">
            <img :src="'static/image/'+item.Logo" alt="" class="el-icon-">
            <span :style="{color:'node#'+item.Id === templateActive?'#ffd04b':'#fff'}">{{item.Name}}</span>
          </template>
          <menus :listData="item.Children" :indexM="indexM===''?('e'+index):indexM+'e'+index"></menus>
          <el-menu-item v-for="(aitem,aindex) in equips['i'+item.Id]"
            :index="indexM===''?('e'+aindex):indexM+'e'+(aindex+item.Children.length)" 
            :style="{color:'equip#'+aitem.equipid === templateActive?'#ffd04b':'#fff'}"
            :key="aindex" :data="active(indexM+'e'+index,'equip#'+aitem.equipid,aitem.equipname,'')"
            @click.stop.native="addMenusEquip(indexM===''?('e'+aindex):indexM+'e'+(aindex+item.Children.length),aitem.equipname,'equip#'+aitem.equipid)"
            ><img :src="'static/image/'+item.Logo" alt="" class="el-icon-">{{aitem.equipname}}</el-menu-item>
      </el-submenu>
    </template>
 </div>           
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    name:'menus',
    props:['listData','indexM'],
    computed:{
      templateActive(){
        return this.$store.state.templateActive
      },
      equips(){
        return this.$store.state.addMenus
      },
    },
    methods:{
      active(index,id,name,type){
         if('node#'+id === this.$store.state.templateActive){
            this.$store.commit('onMenuActive',index)
          }
          if(id === this.$store.state.templateActive.split('#')[1]){
            this.$store.commit('addHistorys',name)
          }
       },
      selectinside(index,id,name,lev,tmpTypeId,Children,nodetype,parentId){
        this.$store.commit('isshow',true)
        let tagnodemsg={Lev:lev+1,TmplTypeId:this.$store.state.nodeId,ParentOrgId:parentId,PreSiblingOrgId:0,Owner:1}
        this.$store.commit('tagNodeMsg', tagnodemsg)
        this.$store.commit('onTemplateActive',id)
        this.$store.commit('onMenuActive',index)
        this.$store.commit('addHistorys',name)
        this.$store.commit('leftid', id.split('#')[1])
        this.$store.commit('onNodeType','Org')
        this.$store.commit('edit')
        this.$store.commit('onViewChange', false)
        axios.get('equips/en/' + id.split('#')[1])
          .then(response => {
            let obj = {}
            obj['data'] = response.data
            obj['id'] = 'i' + id.split('#')[1]
            this.$store.commit('onAddMenus', obj)
            this.openMenu(index)
          })
          .catch(error => {
            if (typeof error.response === 'undefined') {
            }
          })
      },
      addMenusEquip(index,name,id){
        this.$store.commit('onTemplateActive',id)
        this.$store.commit('leftitemid', id.split('#')[1])
        this.$store.commit('addHistorys',name)
        this.$store.commit('onNodeType','equipment')
        this.$store.commit('edit')
      },
      openMenu(index){
        let active = index.split('e')
        active[0] === '' && (active[0] = '2')
        let activeArr = []
        for (var i = 0; i < active.length; i++) {
          var item = ''
          for (var j = 0; j <= i; j++) {
            item += j > 0 ? ('e' + active[j]) : (active[j])
          }
          activeArr.push(item)
        }
        this.$store.commit('onCatchMenu',activeArr)
      }
    },
  }
</script>
<style scoped>

</style>





 











 



