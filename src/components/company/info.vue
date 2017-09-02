<template>
  <div class="company-info">
    <div>
      <el-form :model="companyData" :rules="companyRules" ref="companyData" label-width="100px"
               style="padding:0px 10px 0px 0px;">
        <el-form-item label="LOGO:" prop="logo">
          <img src="../../assets/logo.png" height="60" width="60" style="float: left;"/>
        </el-form-item>
        <el-form-item label="企业名称" prop="name">
          <el-input v-model="companyData.name" placeholder="请输入企业名称..."></el-input>
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
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
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
        companyData: {
          id: null,
          logo: null,
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
      messageRemind  (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
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
