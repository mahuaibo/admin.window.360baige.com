<template>
  <div class="company-info">
    <el-form :model="companyData" :rules="companyRules" ref="companyData" label-width="100px" class="company-info-form">
      <el-form-item label="LOGO:" prop="logo" class="company-info-form-logo">
        <el-upload type="drag" :thumbnail-mode="true" name="uploadFile" :on-success="uploadSuccess"
                   :action="publicParameters.domain + '/user/uploadLogo?accessToken=' + accessToken + '&id=' + companyData.id"
                   class="company-info-from-upload">
          <img :src="companyData.logo" height="48" width="48" class="company-info-form-img"/>
          <div class="el-dragger__text logo-upload">
            <span class="buttom">点击上传</span>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="companyData.name" placeholder="请输入企业名称..." :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="企业简称" prop="short_name">
        <el-input v-model="companyData.short_name" placeholder="请输入简称..."></el-input>
      </el-form-item>
      <el-form-item label="企业地址" prop="address">
        <el-input v-model="companyData.address" placeholder="请输入企业地址..."></el-input>
      </el-form-item>
      <el-form-item label="企业简介" prop="brief">
        <el-input type="textarea" v-model="companyData.brief" resize="none" :autosize="{ minRows: 2, maxRows: 2}"
                  placeholder="请输入企业简介..."></el-input>
      </el-form-item>
      <el-form-item label="企业备注" prop="remark">
        <el-input type="textarea" v-model="companyData.remark" resize="none" :autosize="{ minRows: 2, maxRows: 2}"
                  placeholder="请输入企业备注..."></el-input>
      </el-form-item>
      <el-form-item label=" ">
        <el-button class="modify-button" @click="submitForm('companyData')">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    created () {
      this.initCompanyInfoData(this.companyData)
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      return {
        accessToken: localStorage.getItem('accessToken'),
        companyData: {
          id: null,
          logo: '',
          name: null,
          short_name: null,
          address: null,
          brief: null,
          remark: null
        },
        companyRules: {
          name: [
            {required: true, message: '请输入企业名称', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      ...mapActions([
        'initCompanyInfoData'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: this.publicParameters.domain + '/company/modify',
              params: {
                accessToken: localStorage.getItem('accessToken'),
                id: this.companyData.id,
                logo: this.companyData.logo,
                name: this.companyData.name,
                short_name: this.companyData.short_name,
                address: this.companyData.address,
                brief: this.companyData.brief,
                remark: this.companyData.remark
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                current.messageRemind('success', '用户信息修改成功！')
                current.publicParameters.companyInfoDialog = false
              } else {
                current.messageRemind('error', '用户信息修改失败！')
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
      uploadSuccess (response, file, fileList) {
        console.log(response)
        this.companyData.logo = response.head
      },
      messageRemind (type, Info) { // type success成功   warning警告   error失败
        this.$message({message: Info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .company-info {
    .company-info-form {
      padding: 0px 10px 0px 0px;
      .company-info-form-logo {
        text-align: left;
        .company-info-from-upload {
          height: 48px;
        }
        .company-info-form-img {
          float: left;
          border-radius: 5px;
          border: 1px solid #cadced;
          background: #cadced;
        }
        .logo-upload {
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
    }
  }
</style>
