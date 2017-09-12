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
    <div class="bind_tips_wrap" style="background-color: #f9f9f9;">
      <div class="bind_tips" style="padding:45px 32%;line-height: 24px;color:#808080;font-size: 14px;">
        为了给您更好的操作体验，请选择注册账号绑定或绑定已有账号。以后使用用户名或微信均可登录。



      </div>
    </div>
    <div class="layout-container">
      <div class="switch-control">
        <label class="switch-control-left" id="register-account" @click="toggleBindMode(1)">绑定注册账号</label>
        <label class="switch-control-middle"></label>
        <label class="switch-control-right" id="existing-account" @click="toggleBindMode(2)">绑定已有账号</label>
      </div>
      <div id="registerFormId">
        <el-form :model="registerForm" ref="registerForm" :rules="registerRules">
          <el-form-item prop="username">
            <el-input type="text" placeholder="请输入用户名" v-model="registerForm.username">
              <template slot="prepend">用 &nbsp;&nbsp;&nbsp;户&nbsp;&nbsp; 名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="建议至少使用两种字符组合" v-model="registerForm.password"
                      class="registerForm-input">
              <template slot="prepend">设 置 密 码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confPassword">
            <el-input type="password" placeholder="请再次输入密码" v-model="registerForm.confPassword"
                      class="registerForm-input">
              <template slot="prepend">确 认 密 码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input placeholder="请输入验证码" v-model="registerForm.phone" class="registerForm-input">
              <template slot="prepend">手 &nbsp;&nbsp;&nbsp;机&nbsp;&nbsp; 号</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input placeholder="请输入短信验证码" v-model="registerForm.captcha" class="registerForm-input">
              <template slot="prepend">短信验证码</template>
              <el-button slot="append" calss="phone-captcha" @click="getVerificationCode('registerForm')">获取验证码



              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="register-button" @click="submitForm('registerForm')">绑定注册账号</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div id="loginFormId" style="display: none">
        <el-form :model="loginForm" :rules="loginDataRules" ref="loginForm">
          <el-form-item label="" prop="username">
            <input style="display:none"/>
            <el-input placeholder="请输入账号/手机号/邮箱" v-model="loginForm.username" class="registerForm-input">
              <template slot="prepend">用 &nbsp;&nbsp;户&nbsp;&nbsp; 名</template>
            </el-input>
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" class="registerForm-input">
              <template slot="prepend">密 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 码</template>
            </el-input>
          </el-form-item>
          <el-form-item id="box">
            <el-button class="login-button" @click="submitForm('loginForm')">绑定已有账号</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog title="选择身份" :visible.sync="publicParameters.identityListDialog" :close-on-click-modal="false">
      <admin-user-position></admin-user-position>
    </el-dialog>
    <div class="layout-container-tail">
      <label class="layout-container-tail-text">Copyright © 2015 粤ICP备15062920号</label>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  import CommonHeader from '@/components/common/Header'
  import CommonSidebar from '@/components/common/Sidebar'
  import AdminUserPosition from '@/components/admin/UserPosition'
  export default {
    components: {CommonHeader, CommonSidebar, AdminUserPosition},
    created () {
      this.openId = this.$route.query.openId
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      var validateUserName = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请输入用户名！ 支持中文、字母、数字、_ 的组合，4-20个字符'))
        } else {
          var objRegExp = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
          console.log(objRegExp.test(value))
          if (!objRegExp.test(value)) {
            callback(new Error(' 仅支持中文、字母、数字、_ 组合,且 _ 不能开始或结尾，4-20个字符'))
          }
          axios({
            method: 'POST',
            url: this.publicParameters.domain + '/user/existKey',
            params: {
              key: 'username',
              val: this.registerForm.username
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              callback()
            } else {
              callback(' 该用户名已被注册！')
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
      var validatePwd = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请再次输入确认密码！'))
        } else if (value !== this.registerForm.password) {
          callback(new Error(' 输入密码不一致!'))
        } else {
          callback()
        }
      }
      var validatePhone = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请输入手机号！完成验证后，您可以使用该手机号码登陆和找回密码'))
        } else {
          var objRegExp = /^1[34578]\d{9}$/
          if (!objRegExp.test(value)) {
            callback(new Error(' 手机号码格式错误！'))
          }
          axios({
            method: 'POST',
            url: this.publicParameters.domain + '/user/existKey',
            params: {
              key: 'phone',
              val: this.registerForm.phone
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              callback()
            } else {
              callback(' 该手机号码已被注册！')
            }
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
      return {
        openId: null,
        registerForm: {
          username: null,
          password: null,
          confPassword: null,
          // captcha: null,
          phone: null,
          captcha: null
        },
        loginForm: {
          username: null,
          password: null
        },
        registerRules: {
          username: [
            {required: true, validator: validateUserName, trigger: 'blur'},
            {min: 4, max: 20, message: ' 长度在 4-20 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: ' 请输入密码！建议使用字母、数字和符号两种及以上的组合,6-20个字符', trigger: 'blur'},
            {min: 6, max: 12, message: ' 长度在 6-20 个字符', trigger: 'blur'}
          ],
          confPassword: [
            {required: true, validator: validatePwd, trigger: 'blur'}
          ],
          phone: [
            {required: true, validator: validatePhone, trigger: 'blur'}
          ]
        },
        loginDataRules: {
          username: [
            {required: true, message: '请输入账号/手机号/邮箱', trigger: 'blur'},
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
        'handleClick'
      ]),
      toggleBindMode (key) {
        var register = document.getElementById('register-account')
        var existing = document.getElementById('existing-account')
        var registerFormId = document.getElementById('registerFormId')
        var loginFormId = document.getElementById('loginFormId')
        if (key === 1) {
          register.style.borderBottom = '3px solid #31a7ff'
          existing.style.borderBottom = '0px solid #cadced'
          registerFormId.style.display = ''
          loginFormId.style.display = 'none'
        } else {
          existing.style.borderBottom = '3px solid #31a7ff'
          register.style.borderBottom = '0px solid #cadced'
          loginFormId.style.display = ''
          registerFormId.style.display = 'none'
        }
      },
      // 获取验证码
      getVerificationCode (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/sendMessageCode',
              params: {
                phone: this.registerForm.phone
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.promptInfo('success', '验证码发送成功!')
              } else {
                current.promptInfo('warning', response.data.message)
              }
            }).catch(function (error) {
              console.log(error)
            })
          } else {
            this.promptInfo('warning', '请填写完整的注册信息...')
            return false
          }
        })
      },
      // 微信号码绑定
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var params = null
            if (formName === 'registerForm') {
              params = {
                username: this.registerForm.username,
                password: this.registerForm.password,
                phone: this.registerForm.phone,
                verifyCode: this.registerForm.captcha,
                openId: this.openId
              }
            } else {
              params = {
                type: 1,
                username: this.loginForm.username,
                password: this.loginForm.password,
                openId: this.openId
              }
            }
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/bindAccount',
              params
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                localStorage.setItem('username', response.data.data.username)
                localStorage.setItem('accessTicket', response.data.data.accessTicket)
                current.publicParameters.identityListDialog = true
              } else {
                current.promptInfo('warning', response.data.message)
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
      promptInfo (type, info) { // success 成功   warning 警告   error 失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }

</script>

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
      width: 390px;
      position: relative;
      top: 30px;
      margin: 0 auto;
      .login-button, .register-button {
        min-width: 390px;
        color: #ffffff;
        background-color: #31a7ff;
        border: 0px solid #ffffff;
      }
      .switch-control {
        width: 390px;
        font-size: 24px;
        text-align: center;
        margin-bottom: 30px;
        padding-bottom: 8px;
        border-bottom: 1px solid #cadced;
        .switch-control-left {
          float: left;
          display: inline-block;
          width: 194.5px;
          border-bottom: 3px solid #31a7ff;
          padding-bottom: 11px;
        }
        .switch-control-middle {
          display: inline-block;
          border-right: 1px solid #2c3e50;
          height: 24px;
          margin-top: 5px;
          margin-left: 0px;
        }
        .switch-control-right {
          float: right;
          display: inline-block;
          width: 194.5px;
          padding-bottom: 11px;
        }
      }
    }
    .layout-container-tail {
      background: $color;
      height: 46px;
      position: absolute;
      bottom: 0;
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

  .phone-captcha {
    font-size: 12px;
    background-color: #e2effd;
    color: #5c6873;
  }

  .el-form-item-popm {
    color: #cadced;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }
</style>
