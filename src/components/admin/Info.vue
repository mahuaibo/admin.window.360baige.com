<style lang="scss">
  .el-upload-list__item {
    display: none;
  }

  .head-upload {
    float: right;
    span {
      position: absolute;
      color: #728ca5;
      height: 22px;
      line-height: 22px;
      font-size: 12px;
      background-color: #cadced;
      width: 84px;
      margin-top: 12px;
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
    }
  }

  .modify-button {
    color: #ffffff;
    width: 100%;
    float: right;
    background-color: #31a7ff;
    border: 0px solid #ffffff;
  }

  .modify-button:hover {
    color: #ffffff;
  }
</style>

<template>
  <div class="admin-info">
    <el-form :model="myData" :rules="userInfoRules" ref="myData" label-width="100px" style="padding:0px 10px 0px 0px;">
      <el-form-item label="头像:" prop="head" style="text-align: left;">
        <el-upload :action="publicParameters.domain + '/user/uploadHead?accessToken=' + accessToken + 'id=' + myData.id"
          type="drag" :thumbnail-mode="true" name="uploadFile" :on-success="uploadSuccess">
          <img :src="myData.head" height="48" width="48" style="float: left;border-radius: 2px;"/>
          <div class="el-dragger__text head-upload">
            <span class="buttom">点击上传</span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名:" prop="username">
        <el-input type="username" v-model="myData.username" placeholder="请输入" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input type="string" v-model="myData.phone" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input type="string" v-model="myData.email" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button class="modify-button" @click="submitForm('myData')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initInfoData(this.myData)
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      var phone = (rule, value, callback) => {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入手机号码'))
        }
        callback()
      }
      return {
        accessToken: localStorage.getItem('accessToken'),
        myData: {
          id: null,
          head: '',
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
        'initInfoData'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'GET',
              url: this.publicParameters.domain + '/user/modify',
              params: {
                accessToken: localStorage.getItem('accessToken'),
                id: this.myData.id,
                phone: this.myData.phone,
                email: this.myData.email
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.promptInfo('success', '用户信息修改成功！')
                current.publicParameters.adminInfoDialog = false
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
