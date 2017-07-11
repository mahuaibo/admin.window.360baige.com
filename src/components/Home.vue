<template>
  <div class="layout">
    <div class="layout-sidebar">
      <div class="layout-sidebar-header">
        <img src="../assets/logo.png" height="60" width="60"/>
        <label class="layout-sidebar-header-text">百鸽·<label style="font-size: 14px;">管理平台</label></label>
      </div>
      <div class="layout-sidebar-wrapper">
        <common-sidebar></common-sidebar>
      </div>
    </div>
    <div class="layout-container">
      <div class="layout-container-header">
        <common-header></common-header>
      </div>
      <div class="layout-container-wrapper">
        <router-view></router-view>
      </div>
    </div>
    <div class="layout-bottombar">
      <label class="layout-bottombar-wrapper">Copyright © 2015 粤ICP备15062920号</label>
    </div>
  </div>
</template>

<script>
  import CommonHeader from '@/components/common/Header'
  import CommonSidebar from '@/components/common/Sidebar'

  export default {
    components: {CommonHeader, CommonSidebar}
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $color: #324157 !default;
  .layout {
    position: relative;
    background: #ffffff;
    height: 100vh;
    overflow: hidden;
    .layout-sidebar {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 230px;
      -webkit-transition: -webkit-transform .3s ease-in-out, width .3s ease-in-out;
      -moz-transition: -moz-transform .3s ease-in-out, width .3s ease-in-out;
      -o-transition: -o-transform .3s ease-in-out, width .3s ease-in-out;
      transition: transform .3s ease-in-out, margin .3s ease-in-out;
      height: 100vh;
      .layout-sidebar-header {
        background: $color;
        // border-bottom: 1px solid $color;
        height: 60px;
        .layout-sidebar-header-text {
          color: #ffffff;
          font-weight: bold;
          position: relative;
          left: 0px;
          top: -20px;
        }
      }
      .layout-sidebar-wrapper {
        background: #ffffff;
        height: calc(100vh - 100px);
        overflow: scroll;
        border-right: 1px solid #CCCCCC;
        // margin-left:39px;
        /*margin-top:20px;*/
      }
    }
    .layout-container {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin-left: 230px;
      -webkit-transition: -webkit-transform .3s ease-in-out, width .3s ease-in-out;
      -moz-transition: -moz-transform .3s ease-in-out, width .3s ease-in-out;
      -o-transition: -o-transform .3s ease-in-out, width .3s ease-in-out;
      transition: transform .3s ease-in-out, margin .3s ease-in-out;
      .layout-container-header {
        background: $color;
        // margin-right: 20px;
        height: 60px;
      }
      .layout-container-wrapper {
        background: white;
        height: calc(100vh - 150px);
        overflow: scroll;
        padding: 20px;
      }
    }
  }

  .layout-bottombar {
    background: #324157;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 50px;
    .layout-bottombar-wrapper {
      color: #ffffff;
      line-height: 50px;
      overflow: hidden;
    }
  }
</style>
