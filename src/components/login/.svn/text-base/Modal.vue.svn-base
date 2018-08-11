<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container" v-bind:style="{width:width + 'px'}">
          <div class="modal-header" v-bind:style="{backgroundColor: headerColor }">
            <slot name="header">
            </slot>
            <slot name="delete">

            </slot>
          </div>

          <div class="modal-body" v-bind:style="{width:width + 'px'}">
            <slot name="body">

            </slot>
          </div>
          <div class="modal-footer" v-bind:style="{height:height + 'px'}">
            <div class="left-box">
              <slot name="left-footer"></slot>
            </div>
            <div class="right-box">
              <slot name="right-footer"></slot>
            </div>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  props: {
    width: {
      type: Number,
      defult: 300
    },
    height: {
      type: Number,
      defult: 200
    },
    headerColor: {
      type: String,
      defult: ''
    }
  }
};
</script>
<style >
.modal-mask {
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  min-height: 150px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  margin: 0px auto;
  /*padding: 20px 30px;*/
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  /*font-family: Helvetica, Arial, sans-serif;*/
}
.modal-header {
  margin-top: 0;
  color: white;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #d8dbe2;
  /*background-color: #6084A8;*/
  border-radius: 5px 5px 0px 0px;

}

.modal-body {
  max-height: 400px;
  overflow-y: auto;
  /*padding: 15px 30px;*/
}

.modal-footer {
  height: 50px;
  border-top: 1px solid #d8dbe2;
  padding-top: 1.3%;
  padding-right: 2%;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-footer .left-box {
  position: absolute;
  padding-left: 2%;
}
.modal-footer .left-box span {
  word-break: break-all;
  color: red;
  font-size: 14px;
  line-height: 38px;
}

.modal-footer .right-box {
  display: inline-block;
  vertical-align: bottom;
  text-align: right;
}
.modal-footer .right-box button.btn-borderless {
  margin-left: 0px;
}
</style>
