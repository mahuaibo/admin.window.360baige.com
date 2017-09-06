<style>
  .el-button {
    font-size: 14px;
  }
</style>
<template>
  <div class="layout">
    <div class="layout-sidebar">
      <div class="layout-sidebar-header">
        <img src="../assets/logo-home.png" height="110" width="280"/>
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
  </div>
</template>

<script>
  import CommonHeader from '@/components/common/Header'
  import CommonSidebar from '@/components/common/Sidebar'
  import {mapActions} from 'vuex'

  export default {
    components: {CommonHeader, CommonSidebar},
    created () {
      this.initHomeData()
    },
    methods: {
      ...mapActions([
        'initHomeData'
      ])
    }
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
    min-width: 848px;
    .layout-sidebar {
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 280px;
      -webkit-transition: -webkit-transform .3s ease-in-out, width .3s ease-in-out;
      -moz-transition: -moz-transform .3s ease-in-out, width .3s ease-in-out;
      -o-transition: -o-transform .3s ease-in-out, width .3s ease-in-out;
      transition: transform .3s ease-in-out, margin .3s ease-in-out;
      height: 100vh;
      .layout-sidebar-header {
        height: 110px;
      }
      .layout-sidebar-wrapper {
        background-color: #002f5c;
        height: calc(100vh - 110px);
      }
    }
    .layout-container {
      width: calc(100vw - 280px);
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin-left: 280px;
      -webkit-transition: -webkit-transform .3s ease-in-out, width .3s ease-in-out;
      -moz-transition: -moz-transform .3s ease-in-out, width .3s ease-in-out;
      -o-transition: -o-transform .3s ease-in-out, width .3s ease-in-out;
      transition: transform .3s ease-in-out, margin .3s ease-in-out;
      .layout-container-header {
        background: #f0f0f0;
        border-bottom: 1px solid #cdc9ca;
        height: 58px;
      }
      .layout-container-wrapper {
        background: white;
        height: calc(100vh - 100px);
        overflow: scroll;
        padding: 20px;
      }
    }
  }
</style>
