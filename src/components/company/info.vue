<template>
  <div class="index" style="width: 500px; position:absolute; left:50%; top:40%; transform:translate(-50%,-40%)">
    <el-form :model="data" :rules="rules" ref="data" label-width="75px" class="demo-ruleForm" :data="data">
      <el-form-item label="LOGO:" prop="logo">

      </el-form-item>
      <el-form-item label="用户名:" prop="username">
        <el-input type="username" v-model="data.username" placeholder="请输入" auto-complete="off"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input type="newPwd" v-model="data.phone" property="phone" placeholder="请输入" auto-complete="off"
                  :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input type="confirmPwd" v-model="data.email" property="email" placeholder="请输入"
                  auto-complete="off" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 425px;" type="success" @click="submitForm('data')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data () {
      var username = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'))
        }
      }
      var phone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
      }
      var email = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        }
      }
      return {
        data: {
          username: localStorage.getItem('username'),
          phone: localStorage.getItem('phone'),
          email: localStorage.getItem('email')
        },
        rules: {
          username: [
            {validator: username, trigger: 'blur'}
          ],
          phone: [
            {validator: phone, trigger: 'blur'}
          ],
          email: [
            {validator: email, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            return true
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>
