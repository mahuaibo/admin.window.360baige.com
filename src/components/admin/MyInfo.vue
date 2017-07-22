<template>
  <div class="index" style="width: 500px; position:absolute; left:50%; top:40%; transform:translate(-50%,-40%)">
    <el-form :model="myData" :rules="userInfoRules" ref="myData" label-width="75px" class="demo-ruleForm">
      <!--<el-form-item label="LOGO:" prop="logo"></el-form-item>-->
      <el-form-item label="用户名:" prop="username">
        <el-input type="username" v-model="myData.username" placeholder="请输入" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input type="string" v-model="myData.phone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input type="string" v-model="myData.email" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 425px;" type="success" @click="submitForm('myData')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initMyInfoData(this.myData)
    },
    computed: {
      ...mapGetters([])
    },
    data () {
      var phone = (rule, value, callback) => {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入密码'))
        }
        callback()
      }
      return {
        myData: {
          id: null,
          username: null,
          phone: null,
          email: null
        },
        userInfoRules: {
          phone: [
            {validator: phone, trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'initMyInfoData',
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
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'GET',
              url: 'http://localhost:30000/cloud/window/v1/user/modify',
              params: {
                access_token: localStorage.getItem('positionAccessToken'),
                id: this.myData.id,
                phone: this.myData.phone,
                email: this.myData.email
              }
            }).then(function (response) {
              if (response.data.code === '200') {
                current.promptInfo('success', '用户信息修改成功！')
              } else {
                current.promptInfo('error', '用户信息修改失败！')
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
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
