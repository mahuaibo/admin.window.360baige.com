<template>
  <div class="common-sidebar">
    <el-menu mode="vertical" router :default-active="defaultActive.index" class="el-menu-vertical-demo">
      <el-menu-item-group>
        <el-menu-item index="/home">首页</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/company/info">企业信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/admin/info">用户信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/application/center">应用中心</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/account/list">账户信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/order/list">订单信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="/logger/list">操作日志</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'defaultActive'
      ])
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-menu-vertical-demo {
    background: #ffffff;
  }

  .el-menu-item-group {
    border-bottom: 1px dashed #cccccc;
  }
</style>
