<template>
  <div class="layout">
    <div class="login-dialog">
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form">
        <div class="close-button-vessel">
          <span class="close-button"></span>
        </div>
        <el-form-item label="" prop="username" class="login-item login-item1">
          <div class="login-inputImg">
            <img src="../../assets/account.png" height="20" width="20"/>
          </div>
          <div class="login-input">
            <el-input placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </div>
        </el-form-item>
        <input style="display:none"/>
        <el-form-item label="" prop="password" class="login-item login-item2">
          <div class="login-inputImg">
            <img src="../../assets/password.png" height="20" width="20"/>
          </div>
          <div class="login-input">
            <el-input placeholder="请输入密码" v-model="loginForm.password"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="" prop="remark" class="login-submit">
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
        </el-form-item>
      </el-form>
      <div class="fast-login">
        <div class="fast-login-left"></div>
        <span>快速登陆</span>
        <div class="fast-login-right"></div>
        <div class="fast-login-img">
          <a :href="qqCodeUrl">
            <img src="../../assets/qq.png" width="28px" class="fast-login-imgQQ">
          </a>
          <a :href="weChatCodeUrl">
            <img src="../../assets/weChat.png" width="28px" class="fast-login-imgWeChat">
          </a>
        </div>
      </div>
    </div>
    <div class="select-identity-list" v-loading="loading">
      <div v-for="val in userPositionList.list" class="identityTab" @click="identitySwitch(val)">
        <div class="admin-user-position-userPosition">
          <label class="identityTab-identityImg">
            <img :src="val.companyLogo" height="52" width="52"/>
          </label>
          <div class="identityTab-companyName">{{ val.companyName }}</div>
          <div class="identityTab-userPositionName">{{ val.userPositionName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  import AdminUserPosition from '@/components/admin/UserPosition'
  export default {
    components: {AdminUserPosition},
    created () {
      var code = this.getQueryString('code')
      var state = this.getQueryString('state')
      if (code !== undefined && code !== '' && code !== null) {
        if (state.indexOf('qq') >= 0) {
          this.thirdPartyLogin(code, 3) // qq登陆
        } else {
          this.thirdPartyLogin(code, 2) // 微信登陆
        }
      }
    },
    computed: {
      ...mapGetters([
        'userPositionList',
        'publicParameters'
      ])
    },
    data () {
      return {
        qqCodeUrl: 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101413897&redirect_uri=' + 'http://audit.dev.360baige.com' + '&state=qqLogin',
        weChatCodeUrl: 'https://open.weixin.qq.com/connect/qrconnect?appid=wxe8d941078f9472af&redirect_uri=' + 'http://audit.dev.360baige.com' + '&response_type=code&scope=snsapi_login&state=http://admin.window.360baige.com#wechat_redirect',
        loginForm: {
          username: '',
          password: ''
        },
        accessTicket: null,
        loading: false,
        loginRules: {
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
      getQueryString (name) {
        // 获取当前URL
        var localUrl = document.location.href
        // 获取要取得的get参数位置
        var get = localUrl.indexOf(name + '=')
        if (get === -1) {
          return null
        }
        // 截取字符串
        var getPar = localUrl.slice(name.length + get + 1)
        // 判断截取后的字符串是否还有其他get参数
        var nextPar = getPar.indexOf('&')
        if (nextPar !== -1) {
          getPar = getPar.slice(0, nextPar)
        }
        return getPar
      },
      // 账号登陆
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.loginDomain + '/user/login',
              params: {
                loginType: 1,
                username: this.loginForm.username,
                password: this.loginForm.password
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.accessTicket = response.data.data.accessTicket
                current.transmitAccessTokenGetUserPositionList(response.data.data.accessTicket)
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
      thirdPartyLogin (code, type) {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.loginDomain + '/user/thirdPartyLogin',
          params: {
            loginType: type,
            code: code
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') { // 登录成功保存cookie
            localStorage.setItem('username', response.data.data.username)
            localStorage.setItem('head', response.data.data.head)
            localStorage.setItem('accessTicket', response.data.data.accessTicket)
          } else if (response.data.code === '600') { // 账号未绑定转到绑定
            window.open('http://admin.window.360baige.com/#/admin/bindAccount')
            localStorage.setItem('openType', response.data.data.openType)
            localStorage.setItem('openId', response.data.data.openId)
          } else { // 非法操作返回登录页
            current.promptInfo('warning', '非法操作！')
            window.location.href = '#/homePage'
            current.publicParameters.loginModel = true
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 获取用户角色
      transmitAccessTokenGetUserPositionList () {
        var current = this
        this.userPositionList.list = []
        axios({
          method: 'POST',
          url: this.publicParameters.loginDomain + '/userPosition/list',
          params: {
            accessValue: this.accessTicket
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.userPositionList.list = response.data.data
            document.getElementsByClassName('login-dialog')[0].style.display = 'none'
            document.getElementsByClassName('select-identity-list')[0].style.display = 'table'
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      identitySwitch (data) {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.loginDomain + '/userPosition/getAccessToken',
          params: {
            accessValue: this.accessTicket,
            userPositionId: data.userPositionId
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            localStorage.removeItem('accessTicket')
            localStorage.setItem('accessToken', response.data.data.accessToken)
            current.loading = true
          } else {
            current.promptInfo('error', '角色切换失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss">
  .el-form-item__content {
    width: 318px;
    .login-input {
      .el-input {
        .el-input__inner {
          border: 0px;
        }
      }
    }
  }
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $color: #324157 !default;
  .layout {
    height: 299px;
    width: 390px;
    margin: 0 auto;
    .login-dialog {
      background: #ffffff;
      width: 390px;
      margin: 0 auto;
      .login-form {
        width: 390px;
        margin-bottom: 25px;
        .login-item {
          height: 38px !important;
          width: 320px;
          border: 1px solid #e6e6e6;
          line-height: 38px;
          border-radius: 4px;
          background-color: #ffffff;
          .login-inputImg {
            height: 20px;
            display: inline-block;
            margin: 8px 0px 8px 15px;
            float: left;
          }
          .login-input {
            width: 270px;
            height: 38px;
            float: right;
          }
        }
        .login-item1 {
          margin: 8px 36px 19px 36px !important;
        }
        .login-item2 {
          margin: 0px 36px 19px 36px !important;
        }
        .login-submit {
          button {
            width: 100%;
            font-size: 14px;
          }
          margin: 0px 36px 22px 36px !important;
          padding: 0px;
        }
        .close-button-vessel {
          text-align: right;
          .close-button {
            margin: 15px 15px 0px 0px;
            cursor: pointer;
          }
        }
      }
      .fast-login {
        width: 390px;
        color: #FCA6A6;
        text-align: center;
        margin-bottom: 16px;
        .fast-login-left {
          float: left;
          border-top: 1px solid #cadced;
          width: 118px;
          margin: 10px 9px 0px 36px;
        }
        .fast-login-right {
          border-top: 1px solid #cadced;
          width: 118px;
          float: right;
          margin: 10px 36px 0px 9px;
        }
        .fast-login-img {
          margin-top: 16px;
          .fast-login-imgQQ {
            margin-right: 28px;
          }
          .fast-login-imgWeChat {
            margin-left: 28px;
          }
        }
      }
    }
    .select-identity-list {
      width: 390px;
      height: 299px;
      margin-top: 15px;
      display: none;
      .identityTab {
        float: left;
        margin: 10px 0px 16px 18px;
        width: 166px;
        height: 72px;
        border: 1px solid #ffffff;
        .current-userPosition {
          width: 168px;
          height: 74px;
          border: 1px solid #31a7ff;
          border-radius: 2px;
        }
        .admin-user-position-userPosition:hover {
          cursor: pointer;
          width: 168px;
          height: 74px;
          border: 1px solid #31a7ff;
          border-radius: 2px;
        }
        .identityTab-identityImg {
          float: left;
          margin-left: 10px;
          margin-top: 10px;
          margin-right: 17px;
        }
        .identityTab-companyName {
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
          width: 85px;
          float: right;
          margin-top: 18px;
          text-align: left;
          color: #505050;
        }
        .identityTab-userPositionName {
          width: 85px;
          float: right;
          text-align: left;
          color: #31a7ff;
        }
      }
    }
  }
</style>
