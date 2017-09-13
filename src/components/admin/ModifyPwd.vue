<template>
  <div class="modify-pwd">
    <el-form :model="modifyPwd" :rules="rules" ref="modifyPwd" label-width="100px" class="modify-pwd-form">
      <el-form-item label="旧密码:" prop="pass">
        <el-input type="password" v-model="modifyPwd.pass" placeholder="请输入" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="newPass">
        <el-input type="password" v-model="modifyPwd.newPass" placeholder="请输入" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码:" prop="checkPass">
        <el-input type="password" v-model="modifyPwd.checkPass" placeholder="请输入" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button class="modify-button" @click="submitForm('modifyPwd')">修改</el-button>
        <!--<el-button @click="resetForm('modifyPwd')">重置</el-button>-->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      var passwordCons = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入确认密码...'))
        } else if (value !== this.modifyPwd.newPass) {
          callback(new Error('输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        modifyPwd: {
          pass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          newPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, validator: passwordCons, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/user/modifyPassword',
              params: {
                accessToken: localStorage.getItem('accessToken'),
                password: this.modifyPwd.pass,
                newPassword: this.modifyPwd.newPass
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.promptInfo('success', '密码修改成功！')
                current.publicParameters.modifyPwdDialog = false
              } else {
                current.promptInfo('error', '密码修改失败！')
              }
            }).catch(function (error) {
              console.log(error)
            })
            return true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // resetForm (formName) {
      // this.$refs[formName].resetFields()
      // },
      promptInfo (type, info) {  // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modify-pwd-from {
    padding: 0px 10px 0px 0px;
  }

  .modify-button {
    width: 100%;
    float: right;
    background-color: #31a7ff;
    color: #ffffff;
    border: 0px solid #ffffff
  }

  .modify-button:hover {
    color: #ffffff;
  }
</style>
