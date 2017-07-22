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
      return {
        modifyPwd: {
          pass: '',
          checkPass: ''
        },
        rules: {
          pass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
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
              url: 'http://localhost:30000/cloud/window/v1/user/modifypassword',
              params: {
                access_token: localStorage.getItem('positionAccessToken'),
                password: this.modifyPwd.pass,
                newPassword: this.modifyPwd.checkPass
              }
            }).then(function (response) {
              if (response.data.code === '200') {
                current.promptInfo('success', '密码修改成功！')
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
