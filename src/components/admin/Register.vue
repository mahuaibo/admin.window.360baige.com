<template>
  <div class="layout">
    <div class="layout-sidebar-header">
      <div class="layout-sidebar-header-content">
        <img class="logo" src="../../assets/logo.png" height="78" width="78"/>
        <div class="action-buttons">
          <label @click="handleClick('/admin/register')">注册</label> | <label
          @click="handleClick('/admin/login')">登陆</label>
        </div>
      </div>
    </div>
    <div class="layout-container">
      <div class="layout-container-slogan">欢迎注册 百鸽用户</div>
      <el-form :model="registerForm" :rules="registerRules" ref="registerForm" label-width="100px"
               class="demo-ruleForm">
        <el-input placeholder="请输入用户名" v-model="registerForm.username">
          <template slot="prepend">用 &nbsp;&nbsp;&nbsp;户&nbsp;&nbsp; 名</template>
        </el-input>
        <el-input placeholder="建议至少使用两种字符组合" v-model="registerForm.password" class="registerForm-input">
          <template slot="prepend">设 置 密 码</template>
        </el-input>
        <el-input placeholder="请再次输入密码" v-model="registerForm.confPassword" class="registerForm-input">
          <template slot="prepend">确 认 密 码</template>
        </el-input>
        <!--<el-input placeholder="建议使用常用手机" v-model="registerForm.captcha" class="registerForm-input">-->
        <!--<template slot="prepend">验 &nbsp;&nbsp;&nbsp;证&nbsp;&nbsp; 码</template>-->
        <!--</el-input>-->
        <el-input placeholder="请输入验证码" v-model="registerForm.phone" class="registerForm-input">
          <template slot="prepend">手 &nbsp;&nbsp;&nbsp;机&nbsp;&nbsp; 号</template>
        </el-input>
        <el-input placeholder="请输入短信验证码" v-model="registerForm.pCaptcha" class="registerForm-input">
          <template slot="prepend">短信验证码</template>
          <el-button slot="append" style="font-size: 12px;background-color: #e2effd;color: #5c6873;">获取验证码</el-button>
        </el-input>
        <el-form-item>
          <el-button class="login-button" style="margin-top: 26px;width: 388px;color:#ffffff;background-color: #31a7ff;" @click="submitForm()">立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
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
  export default {
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    components: {CommonHeader, CommonSidebar},
    data () {
      return {
        activeIndex: '1',
        registerForm: {
          username: null,
          password: null,
          confPassword: null,
          // captcha: null,
          phone: null,
          pCaptcha: null
        },
        registerRules: {
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
        'handleClick'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
//            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/login',
              params: {
                username: this.registerForm.username,
                password: this.registerForm.password
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {

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
      resetForm (formName) {
        this.$refs[formName].resetFields()
      },
      promptInfo (type, info) { // type success成功   warning警告   error失败
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
      width: 388px;
      position: relative;
      top: 70px;
      margin: 0 auto;
      .layout-container-slogan {
        font-size: 30px;
        color: #373d41;
        margin-bottom: 40px;
      }
      .registerForm-input {
        margin-top: 30px;
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
</style>
