<template>
  <div style='height:99%;width:100%;overflow:hidden;position:fixed;'>
      <Header></Header>
      <el-container style="height:95%;width:100%; border: 1px solid #eee;">
         <LeftAside></LeftAside>          
         <el-container v-if="!isShow" style='width:70%;height:100%;display:flex;flex-direction:column;'> 
            <el-header style='width:100%;height:10%'>
              <TopBar></TopBar>
            </el-header>
            <el-main style='width:99%;height:90%;margin-top:0px' v-if="$store.state.template.common">
              <form class="template" id="signupForm" method="get" action="">
                <div style="width:99%;margin:10px;">
                  <div class="basicParam"  >
                  <h4 style="width:100%;text-align:left;font-weight:bold;padding-left:1%;" v-if="$store.state.localLang === 'en'">Basic Parameters</h4>
                  <h4 style="width:100%;text-align:left;font-weight:bold;padding-left:1%;" v-if="$store.state.localLang === 'zh_tw'">基礎信息</h4>
                  <h4 style="width:100%;text-align:left;font-weight:bold;padding-left:1%;" v-if="$store.state.localLang === 'zh_cn'">基础信息</h4>
                  <div class="demo-input-suffix" style="diaplay:inline-block;text-align:left;padding-left:30px;width:99%;position:relative;">
                    <span style="width:12.45%;display:inline-block;margin-top:1%;font-weight:bold;margin-right:6px;">
                      <p style="text-align:right"  class="require" v-if="$store.state.localLang === 'en'">Name</p>
                      <p style="text-align:right"  class="require"  v-if="$store.state.localLang === 'zh_cn'">名字</p>
                      <p style="text-align:right"  class="require" v-if="$store.state.localLang === 'zh_tw'">名字</p>
                      </span>
                    <el-input class="name" style="width:70%; positon:relative;" type="text" :placeholder="$store.state.template.common.Basicparam[0].placeholder" v-model="$store.state.template.common.Basicparam[0].value[$store.state.localLang]"  v-on:change="validate($store.state.template.common.Basicparam[0].value[$store.state.localLang], 0,'Name')"></el-input>
                    <div style="color:red;display:inline-blockmargin-top:1%;margin-left: 18.3%;height:15px;">{{$store.state.template.common.Basicparam[0].errormsg}}</div>
                    <!-- <br/> -->
                    <span style="clear:both;width:12.45%;display:inline-block;margin-top:15px;font-weight:bold;margin-right:6px;">
                      <p style="text-align:right"  class="require" v-if="$store.state.localLang === 'en'">Description</p>
                      <p style="text-align:right"  class="require"  v-if="$store.state.localLang === 'zh_cn'">描述</p>
                      <p style="text-align:right"  class="require" v-if="$store.state.localLang === 'zh_tw'">描述</p>
                    </span>
                    <el-input calss="description" type="text" :placeholder="$store.state.template.common.Basicparam[1].placeholder" v-model="$store.state.template.common.Basicparam[1].value[$store.state.localLang]" v-on:change="validate($store.state.template.common.Basicparam[1].value[$store.state.localLang], 1,'Description')" style="width:70%;positon:relative;" clearable="" ></el-input>
                    <el-button id="NodeDescription" type="info" plain="" @click="Multilang('common','Basicparam',1)" style="position:relative;left:-4px;padding:0;top:-2px;" size="small"><img src="@/assets/image/多语言.svg" style="width:32px;height:auto;"/></el-button>
                    <div  style="clear:both;z-index:999;position:absolute;left:15.6%;top:74%;width:68.3%;background-color:white;" v-if="$store.state.template.common.Basicparam[1].mlshow" v-on:mouseleave="closeml('common','Basicparam',1)">
                      <el-form ref="form"  :model="$store.state.template.common.Basicparam[1].value" label-width="80px"  style="clear:both;z-index:999;width:100%;background-color:white;border:1px solid #c0c4cc;border-radius: 4px;">
                        <br/>
                        <el-form-item label="English" >
                          <el-input v-model="$store.state.template.common.Basicparam[1].value.en" placeholder="en" clearable="" ></el-input>
                        </el-form-item>
                        <el-form-item label="繁体中文">
                          <el-input v-model="$store.state.template.common.Basicparam[1].value.zh_tw" clearable="" ></el-input>
                        </el-form-item>
                        <el-form-item label="简体中文">
                          <el-input v-model="$store.state.template.common.Basicparam[1].value.zh_cn" clearable="" ></el-input>
                        </el-form-item>
                        <div id="btns">
                        <el-button type="success" @click="submit('common','Basicparam',1)" plain="">{{i18n.messages[$store.state.localLang].message.sure}}</el-button>
                        <el-button plain=""  @click="closeml('common','Basicparam',1)">{{i18n.messages[$store.state.localLang].message.cancel}}</el-button>
                        </div>
                      </el-form>
                    </div>
                    <div style="color:red;display:inline-blockmargin-top:1%;margin-left: 18.3%;height:10px;">{{$store.state.template.common.Basicparam[1].errormsg}}</div>
                    <!-- <br/> -->
                    <span style="clear:both;width:12.45%;display:inline-block;float:left;margin-top:18px;font-weight:bold;margin-left:6px;">
                      <p style="text-align:right;margin-right:6px;" v-if="$store.state.localLang === 'en'" >Icon</p>
                      <p style="text-align:right;margin-right:6px;" v-if="$store.state.localLang === 'zh_tw'">圖標</p>
                      <p style="text-align:right;margin-right:6px;" v-if="$store.state.localLang === 'zh_cn'">图标</p>
                    </span>
                    <el-select id="icon" type="select" placeholder="" :onChange="getselected($store.state.template.common.Basicparam[2].value.en)" v-model="$store.state.template.common.Basicparam[2].value.en" style="width:40%;positon:relative;top:10px;float:left;margin-bottom:20px;margin-left:4px;">
                      <el-option :value="$store.state.iconimg[index]" v-for="(item,index) in image" :key="index" style="padding-left:16%;">
                        <img :src="item.src" alt="error" style="width:20px;height:auto;">
                      </el-option>
                    </el-select>
                    <div style="position:relative;width:20px;height:20px;left:20%;top:-40px;">
                      <div v-for="(item,index) in image" :key="index" style="width:20px;">
                        <img :src="item.src" alt="error" v-if="''+imageindex === ''+index" style="width:20px;height:auto;z-index:999;background:white">
                      </div>
                    </div>
                  </div>
                  </div>
                  <div class="imgUpload">
                    <form name=”uploadForm”> 
                    <input type="file" id="img_upload" v-on:change="readFile()"/>
                    <input type="text" id="browseText" style="width:0;height:0;border:0;z-index:0"><span style="color:black;padding-left:30%;">{{i18n.messages[$store.state.localLang].message.image}}</span> <input id="browse" type="button" :value="i18n.messages[$store.state.localLang].message.upload" />
                    </form> 
                    <p id="img_area" style="width:100%;text-align:center;position:relative;">
                      <img style="position:relative;" id="uploadimg" :src="$store.state.img" alt="" />
                      <img id="show" src="@/assets/image/删除.svg" alt="" style="width:20px;height:auto;position:absolute;left:90%;top:-14%;z-index:999;cursor:pointer;" v-if="$store.state.img" v-on:click = "$store.commit('deleteimg')">
                    </p> 
                  </div>
                  <div style="width:100% margin-top:20px;">
                    <temp></temp>
                  </div>
                </div>
              </form>
              <div id="btns1">
                <el-button icon="el-icon-check" class="save" type="primary" size="small" @click="save"></el-button>
                <el-button icon="el-icon-close" size="small" @click="goback"></el-button>
              </div>
            </el-main>
            <!-- <div style=""><p style="text-align:center;font-size:24px;" v-if="!$store.state.template.common"> {{$store.state.errorMsg}}</p></div> -->
            <div class="loading-mask" v-show="$store.state.fullscreenLoading">
              <div class="loading-spinner">
                <svg viewBox="25 25 50 50" class="circular">
                  <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                </svg>
              </div>
            </div>
         </el-container> 
         <el-container v-if="isShow" style='width:70%;height:99%'>
           <Welcome></Welcome>
         </el-container>     
      </el-container>
  </div>
</template>
<script type="text/javascript" src="http://libs.baidu.com/jquery/1.7.2/jquery.min.js"></script>
<script>
  import Header from '@/components/component/header.vue'
  import LeftAside from '@/components/component/leftaside'
  import TopBar from '@/components/component/topbar'
  import Welcome from '@/components/component/welcome'
  import temp from '@/components/template/temp'
  import axios from 'axios'
  import qs from 'qs'
  import { Slider } from 'element-ui'
  export default {
  name: 'DeviceCloudManage',
  components: {
    Header,
    LeftAside,
    TopBar,
    temp:temp,
    Welcome
  },
  data () {
    return {
      imageUrl: '',
      i18n:this.$i18n,
      imageindex:'',
      test:[],
      image64:[],
      image: [
        {src:require('@/assets/image/org.svg')},
        {src:require('@/assets/image/organization.svg')},
        {src:require('@/assets/image/devices.svg')},
        {src:require('@/assets/image/equipment.svg')},
        {src:require('@/assets/image/风机.svg')},
        {src:require('@/assets/image/鼓风机.svg')},
        {src:require('@/assets/image/水泵1.svg')},
        {src:require('@/assets/image/补水泵.svg')},
        {src:require('@/assets/image/湿帘水泵.svg')},
        {src:require('@/assets/image/河道水位站.svg')},
        {src:require('@/assets/image/工厂.svg')},
        {src:require('@/assets/image/公园.svg')},
        {src:require('@/assets/image/公园1.svg')},
        {src:require('@/assets/image/研究.svg')},
        {src:require('@/assets/image/地区.svg')},
        {src:require('@/assets/image/农村供水工程.svg')},
        {src:require('@/assets/image/仪表盘.svg')},
        {src:require('@/assets/image/仪表盘2.svg')},
        {src:require('@/assets/image/设备.svg')},
        {src:require('@/assets/image/水电站.svg')},
        {src:require('@/assets/image/供电网点.svg')},
      ],
    }
  },
  computed:{
    isShow(){
      return this.$store.state.viewChange
    }
  },
  updated:function(){
    let updateflag = 0
    this.test.push('0')
    let deleteBtn = document.getElementById('show')
     if(deleteBtn){
       show.style.display = 'block'
     }
    let self = this
    let img = document.getElementById('uploadimg')
    if(img){
        AutoSize1(self)
    }
     function AutoSize1(self) {
        let maxWidth = 275
        let maxHeight =228
        // 当图片比图片框小时不做任何改变
        if(img){
            var image = new Image()
        //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
           image.src =  self.$store.state.img// 从Vuex 拿到base64码
          if(image.width>0){
              img.style.visibility = "visible"
          if (image.width < maxWidth && image.height < maxHeight) {
              img.width = image.width
              img.height = image.height
          }else{
              if (maxWidth/ maxHeight  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
              {
                img.width = maxWidth;   //以框的宽度为标准
                img.height = maxWidth* (image.height / image.width)
              } 
              else {   //原图片宽高比例 小于 图片框宽高比例
                img.width = maxHeight  * (image.width / image.height)
                img.height = maxHeight  ;   //以框的高度为标准
              }
            }
          img.style.marginTop = (228-img.height)/2 + 'px'
          // let deleteBtn = document.getElementById('show')
          // deleteBtn.style.marginTop = (228-img.height)/2 - 10 + 'px'
          }else{
            img.style.visibility = "hidden"
           
            setTimeout(function(){
              AutoSize1(self)
            },100)
           
          }
        }
      }
  },
  methods: {
    validate(val, errortarget, param){
      this.$store.commit('changeflag')
      let self = this
      if(val != ''){
      if(param === 'Name'){
          if(val.length > 20){
            self.$store.commit('changeError',[errortarget,'Please enter a value between 1 and 20 characters long.'])
          }else{
             self.$store.commit('changeError',[errortarget,''])
          }
        }else if(param === 'Description'){
          if(val.length > 240){
            self.$store.commit('changeError',[errortarget,'Please enter a value between 1 and 240 characters long.'])
          }else{
             self.$store.commit('changeError',[errortarget,''])
          }
        }else{
          self.$store.commit('changeError',[errortarget,''])
        }
      }else{
        self.$store.commit('changeError',[errortarget,'This field is required.'])
      }
    },
    imgmouseover() {
     let deleteBtn = document.getElementById('show')
     if(deleteBtn){
       deleteBtn.style.display = 'block'
     }
    },
    imgmouseout() {
     let deleteBtn = document.getElementById('show')
     if(deleteBtn){
      //  show.style.display = 'none'
     }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    readFile() {
      let self = this
      let img_upload=document.getElementById("img_upload")
      // let img_area=document.getElementById("img_area")
      let file=img_upload.files[0]
      let reader=new FileReader()
      reader.readAsDataURL(file)
      reader.onload= function () {
        self.$store.commit('changeimg',this.result) // 将base64码传给VueX
        let Img = document.getElementById('uploadimg')
        Img.src = this.result
        AutoSize(self)
      }
      //$("#browseText").val(document.forms["uploadForm"].upload.value)
     //原图片宽高比例 大于 图片框宽高比例,则以框的宽为标准缩放，反之以框的高为标准缩放
      function AutoSize(self) {
        let img = document.getElementById('uploadimg')
        let maxWidth = 275
        let maxHeight =228
        var image = new Image()
        //原图片原始地址（用于获取原图片的真实宽高，当<img>标签指定了宽、高时不受影响）
        image.src = self.$store.state.img // 从Vuex 拿到base64码
        // 当图片比图片框小时不做任何改变
        if(img){
          if(image.width>0){
          img.style.visibility = "visible"
          if (image.width < maxWidth && image.height < maxHeight) {
              img.width = image.width
              img.height = image.height
          }else{
              if (maxWidth/ maxHeight  <= image.width / image.height) //原图片宽高比例 大于 图片框宽高比例
              {
                img.width = maxWidth;   //以框的宽度为标准
                img.height = maxWidth* (image.height / image.width)
              } 
              else {   //原图片宽高比例 小于 图片框宽高比例
                img.width = maxHeight  * (image.width / image.height)
                img.height = maxHeight  ;   //以框的高度为标准
              }
            }
            img.style.marginTop = (228-img.height)/2 + 'px'
            // let deleteBtn = document.getElementById('show')
            // deleteBtn.style.marginTop = (228-img.height)/2 - 10 + 'px'
          }else{
            img.style.visibility = "hidden"
            setTimeout(function(){
              AutoSize(self)
            },100)
          }
        }
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'||'image/png'||'image/svg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNGT/SVG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
      },
    goback: function () {
      this.$store.commit('edit')
     
    },
    save: function () {
      // 判断要保存的节点是 node 还是 equip
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
        this.$store.commit('setLoading')
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
    getselected: function (name) {
      this.$store.commit('findindex', name)
      this.imageindex = this.$store.state.icon
    },
    submit: function (common,Basicparam,index) {
      this.$store.commit('mlOk',[common,Basicparam,index])
    },
    closeml: function (common,Basicparam,index) {
      this.$store.commit('mlClose',[common,Basicparam,index])
    },
    Multilang: function (common,Basicparam,index) {
      // console.log(common,Basicparam,index)
      this.$store.commit('mlclick',[common,Basicparam,index])
    }
  }
}
</script>
<style>
  *{
    margin:0;
    padding:0;
  }
   #img_upload {
      position:absolute; 
      z-index:2; 
      opacity: 0;
      width: 278px;
      height:24px;
   } 
   #browseText, #browse { position:relative; z-index:1; }
   #browseText { width:190px; padding:3px; border:1px solid #d0d0d0;z-index: 0; } 
   #browse { 
     border:1px solid;
     height:32px;
     padding:0 16px;
     color: #fff;
     background-color: #409EFF;
     border-color: #409EFF;
     outline: 0;
     margin: 0;
     font-weight: 500;
     text-transform: none;
     font-size: 12px;
     border-radius: 3px;
    }
  .msg{
  font-size: 24px;
  position:absolute;
  top:15px;
  left:10px;
  }
  .body{
  width:100%;
  height:880px;
  }
  .template{
  width:100%;
  margin-top:20px;
  }
  .basicParam{
  width:80%;
  height:260px;
  border:1px solid gray;
  float:left;
  }
  .imgUpload{
  width:19.5%;
  height:260px;
  border:1px solid gray;
  float:right;
  overflow: hidden;
  }
  .imgUpload .upload-demo{
  height:100%;
  width:100%;
  }
  .imgUpload .upload-demo .el-upload__tip{
  display: none;
  }
  .el-upload__input {
    display: none !important;
  }
  .imgUpload .upload-demo ul{
  position: relative;
  width:100%;
  height:80%;
  }
  .el-upload--picture{
    margin-left:50%;
    position: relative;
    left:-56px;
  }
  .el-upload-list--picture .el-upload-list__item{
  height:100%;
  }
  .imgUpload .el-upload-list__item {
  padding:0;
  margin:0;
  }
  .el-upload-list--picture .el-upload-list__item-thumbnail {
  margin-left:0;
  width:auto;
  height:auto;
  }
  .imgUpload .el-upload-list__item{
  margin-left:0;
  }
  .imgUpload-Header{
  width:100%;
  height:30px;
  border:1px solid grey;
  }
  .imgUpload .el-upload-list__item img{
  z-index:0;
  width:100%;
  height: auto;
  z-index:0;
  }
  .imgUpload .el-upload-list__item a{
  display: none;
  }
  .el-alert__content i.plus{
  width: 100px;
  height: 100px;
  display: inline-block;
  font-size: 80px;
  position: relative;
  left: 1%;
  top: -40px;
  color:gray;
  }
  .el-alert__content{
  position: relative;
  width:100%;
  padding:0;
  }
  .el-alert{
  padding:0;
  }
  .el-alert--info{
  width:99%;
  background-color: white;
  border:1px solid gray;
  margin-top:20px;
  }
  .el-alert__title{
  display: inline-block;
  position: relative;
  top: 80px;
  width: 214px;
  text-align: left;
  }
  .el-alert__content .el-icon-close{
  width:18px;
  height:18px;
  float:right;
  position: relative;
  top:-40px;
  color: black;
  font-size: 18px;
  }
  .el-alert__content .el-alert__closebtn{
  right:0;
  }
  .el-input__inner{
  width:100%;
  }
  .el-form-item{
    margin-right:20px;
  }
  #btns{
    margin-left:50%;
    margin-top:10px;
    position:relative;
    left:-64px;
    margin-bottom:10px;
  }
  #btns1{
    margin-left:50%;
    margin-top:30px;
    position:relative;
    left:-64px;
    margin-bottom:10px;
  }
  #icon{
    color: white;
  }
  .avatar-uploader{
    width:100%;
    height:auto;
  }
  .avatar-uploader .el-upload--text{
    width:100%;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100%;
    height: 100%;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload-list--picture-card .el-upload-list__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    text-align: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: rgba(0,0,0,.5);
    transition: opacity .3s;
}
#bg{ 
	display: none; 
	position: absolute; 
	top: 0%; 
	left: 0%; 
	width: 100%; 
	height: 100%; 
	background-color: black; 
	z-index:1001; 
	-moz-opacity: 0.3; 
	opacity:.30; 
	filter: alpha(opacity=30);
}
.el-form-item {
    margin-bottom: 10px;
}
.require:before{
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width:10%;
}
.el-form-item{
  margin-bottom: 0;
}
br{
  height:0;
  width:0;
}
.el-input{
  margin-bottom: 0;
}
.el-message-box__message p{
  text-align: center;
  font-size:18px;
}
.el-message-box__btns span {
  display: none;
}
.el-message-box__btns button {
  display: none;
}
</style>
