<template>
  <div class="top_history" style='margin-top:5px;'>
    <div class="top_h_item top_h_title">
      Device Management :
    </div>
    <div v-if="history !== ''" class="top_h_item tag_active" >{{history}}</div>
  </div>
</template>
<script>
  export default {
    name:'history',
    computed:{
      history(){
        return this.$store.state.history
      }
    }
  }
</script>
<style>
  .top_h_title{
    background:green;
    padding:0 10px;
  }
  .top_h_item{
    display:inline-block;
    background:#2C3E50;
    /* border:1px solid #ccc; */
    margin-right:10px;
  }
  .top_h_item>button{
    background:transparent;
    outline: none;
    border:none;
    cursor: pointer;
  }
  .top_h_item>button:nth-child(2){
    /* background:rgba(0,0,0,0.5); */
    background: #409EFF;
  }
  .tag_active{
    background: #409EFF !important;
  }
</style>