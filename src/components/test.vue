<template>
  <div style='height:99%;width:100%;overflow:hidden;position:fixed;'>
      <Header></Header>

      <el-container style="height:95%;width:100%; border: 1px solid #eee;">
         <LeftAside></LeftAside>
                    
         <el-container style='width:70%;height:99%'> 
            <el-header style='width:100%;'>
             <TopBar></TopBar>
            </el-header>
            <el-main style='width:99%;height:100%;'>
              <ML v-if="showml.show"  v-bind:style="{top:showml.top}"  v-bind:english="input.english" v-on:changeinput="bind"><el-button plain  @click="closeML">Cancel</el-button></ML>
              <div class="template">
                <div class="basicParam">
                  <h2>Basic Parameters</h2>
                  <div class="demo-input-suffix">
                    <span style="width:100px;display:inline-block">name</span><el-input  type="text"  placeholder="AdvantechGroup" v-model="input.Nodename" style="width:80%;positon:relative;top:10px;" clearable></el-input><el-button id="Nodename" type="info" plain @click="Multilang"  style="position:relative;top:-5px;">ML</el-button><br/>
                    <span style="width:100px;display:inline-block">Description</span><el-input v-on:changenput="bind" type="text" placeholder="EMS and iWater of Advantech Factories" v-model="input.NodeDescription" style="width:80%;positon:relative;top:10px;" clearable></el-input><el-button id="NodeDescription" type="info" plain @click="Multilang"  style="position:relative;top:-5px;">ML</el-button><br/>
                  </div>
                </div>
                <div class="imgUpload">
                  <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList2" list-type="picture">
                    <span style="positon:relative;left:10px;color:black;">Image</span>
                    <el-button size="small" type="primary">Upload</el-button>
                    <div slot="tip" class="el-upload__tip" style="width:300px;height:80px;"></div>
                  </el-upload>
                </div>
                <div class="addcomponent" :is="item.component" v-for="(item,index) in items">
                  <span slot="close" @click="deleteTemplate(index)">X</span>
                  <el-button type="info" plain @click="Multilang" slot="ml" style="float:left" >ML</el-button><br/>
                </div>
              </div>
              <el-button type="primary">Save</el-button><el-button>Reset</el-button>
            </el-main>
         </el-container>

         <RightAside></RightAside>
       
        
 
      </el-container>
  
     

  </div>

</template>

<style>
  .el-header {
    background-color: #2c3e50;
    color: #FFF;
    
  }


</style>

<script>
 import Header from '@/components/header.vue'
 import LeftAside from '@/components/leftaside'
 import RightAside from '@/components/rightaside'
 import TopBar from '@/components/topbar'
 import Gis from '@/components/Gis'
 import ML from '@/components/ML'
export default {
  name: 'DeviceCloudManage',
  components: {
    Header,
    LeftAside,
    RightAside,
    TopBar,
    Gis: Gis,
    ML: ML
  },
  props: ['text'],
  data () {
    return {
      msg: 'Device Cloud Management',
      flag: false,
      img: {
        name: '',
        data: ''
      },
      fileList2: [],
      showml: {
        show: false,
        top: ''
      },
      ml: {
        english: ''
      },
      clickid: '',
      input: {
        Nodename: '',
        NodeDescription: '',
        english:''
      },
      scroll: '',
      Fixed: false,
      items: []
    }
  },
  methods:{
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    onSubmit () {
            
    },
    closeML: function () {
      this.showml.show = false
    },
    Multilang: function (e) {
      // console.log(Object.prototype.toString.call(e.path[0]) == '[object HTMLSpanElement]');
      let clickTarget;
      if (Object.prototype.toString.call(e.path[0]) == '[object HTMLSpanElement]') {
        clickTarget = e.path[1];
      } else {
        clickTarget = e.path[0];
      }
      // let offsetTop = 90 + e.target.offsetTop + e.target.style.height
      let offsetTop =clickTarget.offsetTop
      this.showml.show = true
      // this.showml.top = offsetTop + 'px'
      this.showml.top = offsetTop + 'px'
      //let dom = e.target.previousElementSibling.value
      this.clickid = clickTarget.getAttribute('id')
      this.input.english=this.input[this.clickid]
    },
    handleScroll: function () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('.sidebar').offsetTop
      if (scrollTop > offsetTop) {
        this.Fixed = true
      } else {
        this.Fixed = false
      }
    },
    UploadImg: function (e) {
      let img = this.img
      let flag = this.flag
      let file = e.target
      let reader = new FileReader()
      reader.readAsDataURL(file.files[0])
      reader.onload = function () {
        img.data = this.result
        flag.change = 'ture'
        setTimeout(() => {
          flag.change = false
        }, 1000)
      }
    },
    bind: function (data) {
      this.ml.english = data
      let clickid=this.clickid
      this.input[clickid]= data
    },
    deleteTemplate: function (index) {
      this.$confirm('Are you sure to delete this node and its child nodes?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.items.splice(index, 1)
        this.$message({
          type: 'success',
          message: 'deleted!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'cancled'
        })
      })
    },
    add: function (name) {
      this.items.push({
        component: name
      })
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },

}

</script>
<style>
*{
    margin:0;
    padding:0;
}
.isFixed{
   position:fixed;
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
  width:74%;
  height:300px;
  border:1px solid gray;
  float:left;
  }
  .imgUpload{
  width:24%;
  height:300px;
  border:1px solid gray;
  margin-left:10px;
  float:left;
  overflow: hidden;
  }
  .imgUpload .upload-demo{
    height:100%;
    width:100%;
  }
  .imgUpload .upload-demo .el-upload__tip{
    display: none;
  }
  .imgUpload .upload-demo ul{
    position: relative;
    width:100%;
    height:80%;
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
    width:100%;
    height: auto;
  }
  .imgUpload .el-upload-list__item a{
    display: none;
  }
  .imgUpload .trangle{
    width:0;
    height:0;
    border-width: 50px;
    border-style:solid;
    border-color:green transparent transparent transparent;
    position: relative;
    left:84%;
    top:-65%;
    transform: rotate(225deg);
  }
  .imgUpload .ok{
    width:40px;
    height:40px;
    position: relative;
    left:88%;
    top:-78%;
    color:white;
    font-size: 28px;
  }
.library{
    width:14%;
    height:912px;
    border:1px solid gray;
    float:right;
    margin-top:60px;
    left:86%;
    position:fixed;
}
 .library img{
  width:80px;
  height:80px;
  }
</style>