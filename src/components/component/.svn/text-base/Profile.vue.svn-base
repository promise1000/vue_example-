<template>
  <div style='height:99%;width:100%;overflow:hidden;position:fixed;'>
    <router-view/>
      <Header></Header>
      <el-container style="height:95%;width:100%; border: 1px solid #eee;">
         <LeftAside></LeftAside>          
         <el-container style='width:70%;height:99%'> 
            <el-header style="width:100%;height:7%;background-color:white;color:black;">
              <div data-v-634b3348="" style="padding-top: 20px; padding-left: 15px;"><span data-v-634b3348="" style="font-size: 28px;"> User Profile </span></div>
              <hr data-v-634b3348="" class="style-one">
            </el-header>
            <el-main style='width:99%;height:90%;margin-top:0px'>
              <div class="template;color:black;"  >
                <div style="width:99%;margin:10px;">
                    <div class="content">
                    <span data-v-634b3348="" class="title" style="">Information </span>
                    <br/><br/>
                    <form action="" style="padding-left: 1%"  class="el-form el-form--label-right">
                        <div class="el-form-item" style="padding-top: 15px;">
                            <label class="el-form-item__label" style="width: 130px">Name:</label>
                            <div class="el-form-item__content" style="margin-left: 130px;"><td data-v-634b3348="">{{$store.state.user.name}}</td></div>
                            <div data-v-634b3348="" class="el-form-item"><div class="el-form-item__content" style="margin-left: 130px;"><div data-v-634b3348="" class="el-input" style="padding-right: 75%;">
                            <input type="text" autocomplete="off" class="el-input__inner" :value="$store.state.user.name"></div></div></div>
                            <div data-v-634b3348="" class="el-form-item">
                                <label class="el-form-item__label" style="width: 130px;">SSO Role :</label>
                                <div class="el-form-item__content" style="margin-left: 130px;">
                                <td data-v-634b3348="">developer</td>
                                </div>
                            </div>
                            <div data-v-634b3348="" class="el-form-item">
                                <label class="el-form-item__label" style="width: 130px;">Description :</label>
                                <div class="el-form-item__content" style="margin-left: 130px;">
                                    <div data-v-634b3348="" class="el-input" style="padding-right: 75%;">
                                        <input type="text" autocomplete="off" class="el-input__inner">
                                    </div>
                                </div>
                            </div>
                            <div data-v-634b3348="" class="el-form-item">
                                <label class="el-form-item__label" style="width: 130px;">Create User :</label>
                                <div class="el-form-item__content" style="margin-left: 130px;">
                                    <td data-v-634b3348="">lin.lei@advantech.com.cn</td>
                                </div>
                            </div>
                            <div data-v-634b3348="" class="el-form-item">
                                <label class="el-form-item__label" style="width: 130px;">Privilege :</label>
                                <div class="el-form-item__content" style="margin-left: 130px;">
                                    <td data-v-634b3348=""> edit_config&nbsp;&nbsp;&nbsp;</td>
                                    <td data-v-634b3348="">edit_value&nbsp;&nbsp;&nbsp;</td><td data-v-634b3348="">get_value&nbsp;&nbsp;&nbsp;</td>
                                </div>
                            </div>
                            <div data-v-634b3348="" style="padding-left: 2%;"><button data-v-634b3348="" class="button">Update</button></div>
                            <hr data-v-634b3348="" class="style-one">
                            <div data-v-634b3348="" class="title"><span data-v-634b3348="">Password </span></div>
                            <div data-v-634b3348="" style="padding-left: 2%; padding-top: 3%;"><button data-v-634b3348="" class="button">Change Password</button></div>
                        </div>
                    </form>
                    </div>
                </div>
              </div>
            </el-main>  
      </el-container>       
    </el-container>
  </div>
</template>
    
</template>
<script>
import Header from '@/components/component/header.vue'
import LeftAside from '@/components/component/leftaside'
import TopBar from '@/components/component/topbar'
export default {
  components: {
    Header,
    LeftAside,
    TopBar,
  },
}
</script>
<style>
hr.style-one[data-v-634b3348] {
    border: 0;
    height: 1.5px;
    background: #aaa;
}
hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
    box-sizing: content-box;
}
.title[data-v-634b3348] {
    font-size: 20px;
    padding-left: 2%;
    font-weight: 700;
}
.el-form-item:after, .el-form-item:before {
    display: table;
    content: "";
}
.el-form-item::after, .el-form-item::before {
    display: table;
    content: "";
}
.el-form-item {
    margin-bottom: 22px;
}
.el-form-item {
    margin-bottom: 22px;
}
.el-form-item__label {
    text-align: right;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
}
.el-form-item__content .el-input-group, .el-form-item__label, .el-tag .el-icon-close {
    vertical-align: middle;
}
.el-form-item__content, .el-form-item__label {
    font-size: 16px!important;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 0;
    font-weight: 700;
}
</style>


