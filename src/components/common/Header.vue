<template>
  <div class="common-header">
    <el-menu class="el-menu-demo el-menu-demo-right" router :default-active="activeIndex" mode="horizontal"
             @select="handleSelect" theme="dark">
      <el-menu-item index="1"><i class="el-icon-message"></i>系统消息</el-menu-item>
      <el-submenu index="2">
        <template slot="title">{{ name }}</template>
        <el-menu-item index="/myinfo">我的信息</el-menu-item>
        <el-menu-item index="/modifyPassword">修改密码</el-menu-item>
        <el-menu-item @click="logout()" index="/login">退出</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        name: localStorage.getItem('username')
      }
    },
    methods: {
      handleSelect () {

      },
      logout () {
        axios({
          method: 'POST',
          url: 'http://localhost:9090/v1/admin/logout',
          params: {
            Username: localStorage.getItem('username'),
            AccessToken: localStorage.getItem('accessToken')
          }
        }).then(function (response) {
          if (response.data.AccessToken) {
            localStorage.removeItem('username')
            localStorage.removeItem('accessToken')
            window.location.href = '#/login'
          } else {
            localStorage.removeItem('username')
            localStorage.removeItem('accessToken')
            window.location.href = '#/login'
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu-demo-right {
    background: #324157;
    margin-right: 20px;
    margin-top: -1px;
    position: absolute;
    right: 0px;
  }
</style>
