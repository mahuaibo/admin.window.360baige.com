<template>
  <div class="admin-info">
    <el-form :model="myData" :rules="userInfoRules" ref="myData" label-width="100px" class="admin-info-form">
      <el-form-item label="头像:" prop="head" class="admin-info-form-head">
        <el-upload type="drag" :thumbnail-mode="true" name="uploadFile" :on-success="uploadSuccess"
                   :action="publicParameters.domain + '/user/uploadHead?accessToken=' + accessToken + '&&id=' + myData.id"
                   class="admin-info-form-headUpload">
          <img :src="myData.head" height="48" width="48" class="admin-info-form-headImg"/>
          <div class="el-dragger__text head-upload">
            <span class="buttom">点击上传</span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名:" prop="username">
        <el-input type="username" v-model="myData.username" placeholder="暂未" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="phone">
        <el-input type="string" v-model="myData.phone" placeholder="暂未" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="邮箱:" prop="email">
        <el-input type="string" v-model="myData.email" placeholder="暂未" :disabled="true"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

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
          callback(new Error('手机号码格式错误'))
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
            {message: '请输入邮箱地址', trigger: 'blur'},
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
                email: this.myData.email,
                head: this.myData.head
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
      uploadSuccess (response, file, fileList) {
        this.myData.head = response.head
      },
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .admin-info {
    .admin-info-form {
      padding: 0px 10px 0px 0px;
      .admin-info-form-head {
        text-align: left;
        .admin-info-form-headUpload {
          height: 48px;
        }
        .admin-info-form-headImg {
          float: left;
          border-radius: 5px;
          border: 1px solid #cadced;
          background: #cadced;
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
            margin-top: 14px;
            border-top-right-radius: 20px;
            border-bottom-right-radius: 20px;
          }
        }
      }
    }
  }
</style>
