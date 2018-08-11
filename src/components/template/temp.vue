<template>
  <div id="temp" style="clear:both;position:relative;top:10px;">
    <div v-for="(t,key) in $store.state.template.render" :key="key">
      <div style="clear:both;border:1px solid grey;margin-top:10px;width:100%;height:auto;margin-bottom:10px;padding-bottom:15px;" v-if="key !== 'test'" >
         <h4 style="width:100%;text-align:left;padding-left:1%;font-weight:bold">{{$store.state.template.render[key][0].groupname[$store.state.localLang]||'null'}}</h4>
         <div v-for="(item,index) in t" style="diaplay:inline-block;text-align:left;padding-left:30px;width:99%;position:relative;" class="demo-input-suffix" :key="index">
            <span style="clear:both;width:10%;display:inline-block;margin-top:15px;font-weight:bold;"> <p style="text-align:right;" :class="{require: arr.indexOf(item.param) >= 0}">{{item.param[$store.state.localLang]||'null'}}</p></span>
            <el-input v-if="item.htmltype === 1"  v-model="item.value[$store.state.localLang]" :placeholder="item.placeholder" style="width:70%;z-index:1;margin-left:6px;"  v-on:change="validate(item.value[$store.state.localLang],key,index,item.param)" clearable></el-input>
            <el-button style="margin-left:-4px;font-weight:bold;padding:0;position:relative;top:-2px;" v-if="item.ml" type="info" plain size="small" class="mlbtn"  @click="Multilang('render',key,index)"><img src="@/assets/image/多语言.svg" style="width:32px;height:auto;"/></el-button>
            <div  style="clear:both;position:absolute;left:12.6%;width:68.6%;background-color:white;margin-top:0%;"  v-if="item.mlshow" v-on:mouseleave="closeml('render',key,index)">
              <el-form ref="form"  :model="item.value" label-width="80px"  style="position:relative;clear:both;z-index:999;border-radius: 4px;width:100%;background-color:white;border:1px solid #c0c4cc;">
                <br/>
                <el-form-item label="English" >
                  <el-input v-model="item.value.en" placeholder="" clearable="" ></el-input>
                </el-form-item>
                <el-form-item label="繁体中文">
                  <el-input v-model="item.value.zh_tw" clearable="" ></el-input>
                </el-form-item>
                <el-form-item label="简体中文">
                  <el-input v-model="item.value.zh_cn" clearable="" ></el-input>
                </el-form-item>
                <p style="text-align:center;margin-top:10px;">
                  <el-button type="success" @click="submit('render',key,index)" plain="">{{i18n.messages[$store.state.localLang].message.sure}}</el-button>
                  <el-button plain=""  @click="closeml('render',key,index)">{{i18n.messages[$store.state.localLang].message.cancel}}</el-button>
                </p>
                <!-- <br/> -->
              </el-form>
            </div>
            <el-select type="select" v-else-if="item.htmltype === 2" v-model="item.value.en" :placeholder="item.placeholder" style="width:80%;margin-bottom:10px;z-index:1;" clearable>
              <div v-for="i in item.options" :key="i">
                <el-option :value="i" ></el-option>
              </div>
            </el-select>
            <div style="color:red;display:inline-block;margin-top:1%;margin-left: 14.5%;height:5px;margin-bottom:10px;" ><div v-if="arr.indexOf(item.param) >= 0">{{$store.state.template.render[key][index].errormsg}}</div></div>
         </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import vuex from 'vuex'
  Vue.use(vuex)
  export default {
  name: 'temp',
  data() {
    return{
      arr:['Address','地址','地址','Latitude','经度','經度','Longitude','纬度','緯度','Region Code','邮编','郵編'],
      i18n:this.$i18n
    }
  },
  methods:{
    submit: function (common,Basicparam,index) {
      this.$store.commit('mlOk',[common,Basicparam,index])
    },
    Multilang: function (common,Basicparam,index) {
      this.$store.commit('mlclick',[common,Basicparam,index])
    },
    closeml: function (common,Basicparam,index) {
      this.$store.commit('mlClose',[common,Basicparam,index])
    },
    validate(val,key,index,param){
      this.$store.commit('changeflag')
      let self = this
      let val1 = val.trim()
      let decimal =/^\d+(?:\.\d{1,10})?$/ // 小数位不超过10
      let digits = /^(-?\\d+)(\\.\\d+)?$/  // 正浮点数
      let digits1 = /^[-\+]?\d+(\.\d+)?$/ //非正浮点数
      let digits2 = /^[-+]?\d*$/ // 数字
      let int = /^[0-9]*[1-9][0-9]*$/ //非负整数
      let number = /^\d+$/
      if(val != ''){
        if(param === 'Address'){
          if(val.length > 240){
            self.$store.commit('changeError1',[key,index,'Please enter a value between 1 and 240 characters long.'])
          }else{
             self.$store.commit('changeError1',[key,index,''])
          }
        }else if(param === 'Longitude'){
          if(digits.test(val1) || digits1.test(val1)){
            if(decimal.test(Math.abs(val1))){
              if(val1 > parseInt('180')){
              self.$store.commit('changeError1',[key,index,'Please enter a value between 0 and 180.'])
              }else{
                self.$store.commit('changeError1',[key,index,''])
              }
            }else{
              self.$store.commit('changeError1',[key,index,'Please enter no more than 10 decimal places.'])
            }
          }else{
            self.$store.commit('changeError1',[key,index,'Please enter only digits.'])
          }
        }else if(param === 'Latitude'){
          if(digits.test(val1) || digits1.test(val1)){
            if(decimal.test(Math.abs(val1))){
              if(val1 > parseInt('90')){
              self.$store.commit('changeError1',[key,index,'Please enter a value between 0 and 90.'])
            }else{
              self.$store.commit('changeError1',[key,index,''])
            }
            }else{
              self.$store.commit('changeError1',[key,index,'Please enter no more than 10 decimal places.'])
            }
          }else{
            self.$store.commit('changeError1',[key,index,'Please enter only digits.'])
          }
        }else if(param === 'Region Code'){
          if(number.test(val1)){
            if(int.test(val1)){
              if(val1 > parseInt('999999')){
                self.$store.commit('changeError1',[key,index,'Please enter a value between 0 and 999999.'])
              }else{
                self.$store.commit('changeError1',[key,index,''])
              }
            }else{
              self.$store.commit('changeError1',[key,index,'Please enter only a positive integer.'])
            }
          }else{
            self.$store.commit('changeError1',[key,index,'Please enter only digits.'])
          }
        }else{
          self.$store.commit('changeError1',[key,index,''])
        }
      }else{
        self.$store.commit('changeError1',[key,index,'this field is required'])
      }
    },
  }
  }
</script>
<style scoped>
.demo-input-suffix{
  margin-top:10px;
  height:50px;
}
.demo-input-suffix span{
  /* height:40px; */
  position:relative;
  margin:0;
  padding:0;
  text-align: right;
}
.demo-input-suffix span p{
  display: inline-block;
    position: relative;
    /* top: 8px; */
    margin:0;
    padding:0;
    vertical-align: middle;
}
  
</style>
