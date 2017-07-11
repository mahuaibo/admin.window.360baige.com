<template>
  <div class="index" style="width: 500px; position:absolute; left:50%; top:40%; transform:translate(-50%,-40%)">
    <el-form :model="modifyPwd" :rules="rules" ref="modifyPwd" label-width="75px" class="demo-ruleForm">
      <el-form-item label="密码:" prop="pass">
        <el-input type="newPwd" v-model="modifyPwd.pass" placeholder="请输入" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码:" prop="checkPass">
        <el-input type="confirmPwd" v-model="modifyPwd.checkPass" placeholder="请输入" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="submitForm('modifyPwd')">修改</el-button>
        <el-button @click="resetForm('modifyPwd')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data () {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }
      return {
        modifyPwd: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('http://localhost:9090/v1/admin/modifyPassword/' + this.modifyPwd.username + '/' + this.modifyPwd.pass + '/' + this.modifyPwd.checkPass + '/').then(function (response) {
              if (response.data.Id) {
                alert('密码修改成功')
                window.location.href = '#/login'
              } else {
                alert('用户名密码错误！')
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
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
