<template>
  <div class="common-header">
    <el-menu class="el-menu-demo el-menu-demo-right" router :default-active="activeIndex" mode="horizontal"
             @select="handleSelect" theme="dark">
      <el-menu-item index="1"><i class="el-icon-message"></i>系统消息</el-menu-item>
      <el-dropdown style="padding-top: 20px;" @command="handleCommand" menu-align="start">
        <span class="el-dropdown-link" style="color:#ffffff;">
          {{ name }}<i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="/admin/info">我的信息</el-dropdown-item>
          <el-dropdown-item command="/admin/modifyPassword">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<script>
  import axios from 'axios'
  import router from '../.././router'
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
      handleCommand (index) {
        if (index === 'logout') {
          axios({
            method: 'POST',
            url: 'http://localhost:30000/cloud/window/v1/user/logout',
            params: {
              access_token: localStorage.getItem('loginAccessToken')
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              localStorage.removeItem('userId')
              localStorage.removeItem('username')
              localStorage.removeItem('loginAccessToken')
              localStorage.removeItem('positionAccessToken')
              window.location.href = '#/admin/login'
            } else {
              window.location.href = '#/'
            }
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          router.push(index)
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu-demo-right {
    background: #324157;
    margin-right: 20px;
    position: absolute;
    right: 0px;
  }
</style>
