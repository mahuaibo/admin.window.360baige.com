<template>
  <div class="layout">
    <div class="layout-sidebar-header">
      <div class="layout-sidebar-header-left">
        <img src="../../assets/logo.png" height="60" width="60"/>
        <label class="layout-sidebar-header-left-text">百鸽·<label style="font-size: 14px;">开放平台</label></label>
      </div>
      <div class="layout-sidebar-header-right">
        <el-menu class="el-menu-demo" router :default-active="activeIndex" mode="horizontal"
                 @select="handleSelect" theme="dark">
          <el-menu-item index="1"><i class="el-icon-message"></i>系统消息</el-menu-item>
          <el-menu-item index="2">登陆信息</el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="layout-container">
      <div class="loginbox">
        <div class="loginbox-left">
          <el-form :model="loginDataForm" :rules="loginDataRules" ref="ruleForm2" label-width="100px"
                   class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="loginDataForm.username" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginDataForm.password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 210px;" type="success" @click="submitForm('loginDataForm')">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="loginbox-right">
          <div class="loginbox-right-register">
            <el-button type="text" @click="handleClick('/register')">免费注册</el-button>
          </div>
          <div class="loginbox-right-prompt" style="color: #FF0000;">第三方登陆</div>
          <div class="loginbox-right-icon">
            <img src="../../assets/qq.png" height="35" width="35"/>
            <img src="../../assets/wechat.png" height="35" width="35"/>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container-tail">
      <label class="layout-container-tail-text">Copyright © 2015 粤ICP备15062920号</label>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import CommonHeader from '@/components/common/Header'
  import CommonSidebar from '@/components/common/Sidebar'
  export default {
    computed: {
      ...mapGetters([])
    },
    components: {CommonHeader, CommonSidebar},
    data () {
      var validateUsername = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
      }
      return {
        activeIndex: '1',
        loginDataForm: {
          username: null,
          password: null
        },
        loginDataRules: {
          username: [
            {validator: validateUsername, trigger: 'blur'}
          ],
          password: [
            {validator: validatePass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'increment',
        'decrement',
        'handleClick',
        'handleDetail',
        'handleEdit',
        'handleDelete',
        'handleSelectionChange',
        'handleSizeChange',
        'handleCurrentChange'
      ]),
      handleSelect () {

      },
      submitForm (formName) {
        console.log(formName)
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
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
    .layout-sidebar-header {
      height: 100vh;
      .layout-sidebar-header-left {
        background: $color;
        height: 60px;
        width: 20%;
        position: absolute;
        left: 0;
        img {
          margin-left: 20px;
        }
        .layout-sidebar-header-left-text {
          color: #ffffff;
          font-weight: bold;
          position: relative;
          left: 0px;
          top: -20px;
        }
      }
      .layout-sidebar-header-right {
        background: $color;
        height: 60px;
        width: 80%;
        position: absolute;
        right: 0;
        .el-menu-demo {
          position: absolute;
          right: 0;
        }
      }
    }
    .layout-container {
      box-sizing: border-box;
      position: absolute;
      top: 60px;
      bottom: 60px;
      width: 100%;
      .loginbox {
        width: 460px;
        height: 240px;
        border: 1px solid #cccccc;
        border-radius: 8px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -100px;
        .loginbox-left {
          width: 310px;
          height: 70%;
          border-right: 1px solid #cccccc;
          margin: 3% 0;
          padding: 20px;
        }
        .loginbox-right {
          display: inline;
          width: 110px;
          height: 88%;
          margin-left: 120px;
          position: absolute;
          margin-top: -222px;
          .loginbox-right-register, .loginbox-right-prompt, .loginbox-right-icon {
            padding-top: 35px;
            font-size: 14px;
            cursor: pointer;
          }
        }
      }
    }
    .layout-container-tail {
      background: $color;
      height: 60px;
      position: absolute;
      bottom: 0px;
      width: 100%;
      .layout-container-tail-text {
        color: #ffffff;
        font-weight: bold;
        position: relative;
        font-size: 14px;
        top: 20px;
      }
    }
  }
</style>
