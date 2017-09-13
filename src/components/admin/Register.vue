<template>
  <div class="layout">
    <div class="register-sidebar-header">
      <div class="register-sidebar-header-content">
        <img class="register-sidebar-header-logo" src="../../assets/logo.png" height="38"/>
        <div class="register-sidebar-header-action-buttons">
          <label @click="handleClick('/admin/register')">注册</label> | <label
          @click="handleClick('/admin/login')">登陆</label>
        </div>
      </div>
    </div>
    <div class="register-container">
      <div class="register-container-slogan">欢迎注册 百鸽用户</div>
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
            <el-button slot="append" calss="phone-captcha" @click="getVerificationCode('registerForm')">
              <span>获取验证码</span>
            </el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="register-button" @click="submitForm('registerForm')">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="register-container-tail">
      <label class="register-container-tail-text">Copyright © 2015 粤ICP备15062920号</label>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  import CommonHeader from '@/components/common/Header'
  import CommonSidebar from '@/components/common/Sidebar'
  export default {
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    components: {CommonHeader, CommonSidebar},
    data () {
      var validateUserName = (rule, value, callback) => {
        if (value === '' || value === null) {
          callback(new Error(' 请输入用户名！ 支持中文、字母、数字、_ 的组合，4-20个字符'))
        } else {
          var objRegExp = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
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
        registerForm: {
          username: null,
          password: null,
          confPassword: null,
          // captcha: null,
          phone: null,
          captcha: null
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
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick'
      ]),
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
      // 注册
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/register',
              params: {
                username: this.registerForm.username,
                password: this.registerForm.password,
                phone: this.registerForm.phone,
                verifyCode: this.registerForm.captcha
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.promptInfo('success', response.data.message)
                window.location.href = '#/admin/login'
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
    .register-sidebar-header {
      .register-sidebar-header-content {
        background: $color;
        height: 78px;
        width: 100%;
        .register-sidebar-header-logo {
          position: absolute;
          left: 192px;
          margin-top: 20px;
        }
        .register-sidebar-header-action-buttons {
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
    .register-container {
      width: 388px;
      min-height: 656px;
      height: calc(100vh - 124px);
      margin: 0 auto;
      .register-container-slogan {
        font-size: 30px;
        color: #373d41;
        padding: 40px 0;
      }
      .register-button {
        width: 388px;
        color: #ffffff;
        background-color: #31a7ff;
        border: 0px solid #ffffff;
      }
    }
    .register-container-tail {
      background: $color;
      height: 46px;
      width: 100%;
      .register-container-tail-text {
        color: #ffffff;
        font-weight: bold;
        position: relative;
        font-size: 12px;
        top: 12px;
      }
    }
    .phone-captcha {
      font-size: 12px;
      background-color: #e2effd;
      color: #5c6873;
    }
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
