<template>
  <div class="layout">
    <div class="layout-sidebar-header">
      <div class="layout-sidebar-header-content">
        <img class="logo" src="../../assets/logo.png" height="38"/>
        <div class="action-buttons">
          <label @click="handleClick('/admin/register')">注册</label> |
          <label @click="handleClick('/admin/login')">登陆</label>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <div class="login-box">
        <div class="layout-container-left">
          <el-form :model="loginDataForm" :rules="loginDataRules" ref="loginDataForm">
            <el-form-item label="" prop="username" style="width: 288px;">
              <input style="display:none"/>
              <el-input v-model="loginDataForm.username" placeholder="请输入用户名"
                        @keyup.enter.native="submitForm('loginDataForm')" autoComplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="password" style="width: 288px;">
              <el-input type="password" v-model="loginDataForm.password" placeholder="请输入密码"
                        @keyup.enter.native="submitForm('loginDataForm')" autoComplete="off"></el-input>
            </el-form-item>
            <el-form-item id="box" style="width: 288px;">
              <el-button class="login-button" @click="submitForm('loginDataForm')">登陆</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="layout-container-right">
          <div class="loginbox-right-register">
            <div type="text" @click="handleClick('/admin/register')" style="color: #31a7ff;padding: 0;">免费注册</div>
          </div>
          <div class="loginbox-right-prompt" style="color: #fe5b5a;"> — 快速登陆 — </div>
          <div class="loginbox-right-icon">
            <img src="../../assets/login-qq.png" height="35" width="35"/>
            <a :href="weChatCodeUrl">
              <img src="../../assets/login-weixin.png" style="margin-top: 5px;height:35px;width: 35px;"/>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="layout-container-tail">
      <label class="layout-container-tail-text">Copyright © 2015 粤ICP备15062920号</label>
    </div>
    <el-dialog title="选择身份" :visible.sync="publicParameters.identityListDialog" :close-on-click-modal="false">
      <admin-user-position></admin-user-position>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  import CommonHeader from '@/components/common/Header'
  import CommonSidebar from '@/components/common/Sidebar'
  import AdminUserPosition from '@/components/admin/UserPosition'
  export default {
    created () {
      var reg = new RegExp('(^|&)code=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r === null) {
        return
      }
      var code = unescape(r[2])
      if (code !== undefined && code !== '' && code !== null) {
        this.weChatBindStatus(code)
      }
    },
    computed: {
      ...mapGetters([
        'publicParameters',
        'wechat'
      ])
    },
    components: {CommonHeader, CommonSidebar, AdminUserPosition},
    data () {
      return {
        weChatCodeUrl: 'https://open.weixin.qq.com/connect/qrconnect?appid=wxe8d941078f9472af&redirect_uri=' + window.location.origin + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect',
        loginDataForm: {
          username: null,
          password: null
        },
        loginDataRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick',
        'getUserPositionList'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/login',
              params: {
                username: this.loginDataForm.username,
                password: this.loginDataForm.password
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                localStorage.setItem('username', response.data.data.username)
                localStorage.setItem('head', response.data.data.head)
                localStorage.setItem('accessTicket', response.data.data.accessTicket)
                current.publicParameters.identityListDialog = true
              } else {
                current.promptInfo('error', '用户名密码错误！')
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 获取微信用户绑定转态
      weChatBindStatus (code) {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/user/weChatLogin',
          params: {code: code}
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            localStorage.setItem('username', response.data.data.username)
            localStorage.setItem('accessTicket', response.data.data.accessTicket)
            current.publicParameters.identityListDialog = true
          } else if (response.data.code === '600') {
            window.location.href = '#/admin/bindAccount?openId=' + response.data.data.openId
          } else {
            current.promptInfo('warning', '非法操作！')
            window.location.href = '#/admin/login'
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {
          })
      }
    }
  }

</script>

<style lang="scss">
  .el-dialog {
    width: 456px !important;
    .el-dialog__body {
      padding: 12px 8px 6px 0px !important;
    }
    .el-form-item {
      margin: 14px 14px 20px 14px !important;
    }
  }

  .el-dialog__header {
    background-color: #31a7ff !important;
    padding: 0px !important;
    margin: 0px !important;
    height: 55px !important;
    line-height: 60px !important;
    border-radius: 2px !important;
    text-align: center !important;
    .el-dialog__title {
      color: #ffffff !important;
      font-size: 18px !important;
      font-weight: normal !important;
    }
    .el-dialog__headerbtn {
      padding-top: 20px !important;
      padding-right: 20px !important;
    }
  }

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $color: #002f5c !default;
  .layout {
    height: 100vh;
    .layout-sidebar-header {
      .layout-sidebar-header-content {
        background: $color;
        height: 78px;
        width: 100%;
        .logo {
          position: absolute;
          left: 192px;
          margin-top: 20px;
          vertical-align: middle;
        }
        .action-buttons {
          color: #ffffff;
          position: absolute;
          right: 192px;
          height: 78px;
          line-height: 78px;
          label {
            cursor: pointer;
          }
        }
      }
    }
    .layout-container {
      min-height: 656px;
      background: url("../../assets/bg.jpg") no-repeat;
      background-position: center;
      height: calc(100vh - 124px);
      width: 100%;
    }
    .login-box {
      width: 516px;
      height: 238px;
      border: 1px solid #cadced;
      background-color: #ffffff;
      border-radius: 3px;
      position: absolute;
      right: 192px;
      top: 240px;
      .layout-container-left {
        width: 318px;
        margin-top: 42px;
        margin-left: 30px;
        border-right: 1px solid #cadced;
        .login-button {
          width: 288px;
          height: 38px;
          float: right;
          background: #31a7ff;
          color: #ffffff;
          border: 0px solid #ffffff;
        }
      }
      .layout-container-right {
        width: 170px;
        height: 88%;
        margin-left: 348px;
        position: absolute;
        margin-top: -222px;
        .loginbox-right-register {
          padding-top: 48px;
          font-size: 14px;
        }
        .loginbox-right-prompt {
          padding-top: 16px;
          font-size: 14px;
        }
        .loginbox-right-icon {
          width: 35px;
          padding-top: 18px;
          font-size: 14px;
          margin-left: 68px;
        }
      }
    }
    .layout-container-tail {
      background: $color;
      height: 46px;
      width: 100%;
      .layout-container-tail-text {
        color: #ffffff;
        font-weight: bold;
        position: relative;
        font-size: 12px;
        top: 12px;
      }
    }
  }
</style>
