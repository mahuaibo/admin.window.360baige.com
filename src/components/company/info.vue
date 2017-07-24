<template>
  <div class="index" style="width: 500px; position:absolute; left:50%; top:40%; transform:translate(-50%,-40%)">
    <el-form :model="companyData" :rules="companyRules" ref="companyData" label-width="85px" class="demo-ruleForm">
      <el-form-item label="LOGO:" prop="logo">
        <img src="../../assets/logo.png" height="60" width="60" style="float: left;position:relative;top:-12px;"/>
      </el-form-item>
      <el-form-item label="企业名称:" prop="name">
        <el-input v-model="companyData.name" placeholder="请输入企业名称..."></el-input>
      </el-form-item>
      <el-form-item label="企业简称:" prop="short_name">
        <el-input v-model="companyData.short_name" placeholder="请输入简称..."></el-input>
      </el-form-item>
      <el-form-item label="企业地址:" prop="address">
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
      <el-form-item>
        <el-button style="width: 415px;" type="success" @click="submitForm('companyData')">修改</el-button>
      </el-form-item>
    </el-form>
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
      ...mapGetters([])
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
        'initCompanyInfoData',
        'handleClick'
      ]),
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'POST',
              url: 'http://localhost:30000/cloud/window/v1/company/modify',
              params: {
                access_token: localStorage.getItem('positionAccessToken'),
                id: this.companyData.id,
                logo: this.companyData.logo,
                name: this.companyData.name,
                short_name: this.companyData.short_name,
                address: this.companyData.address,
                brief: this.companyData.brief,
                remark: this.companyData.remark
              }
            }).then(function (response) {
              if (response.data.code === '200') {
                current.messageRemind('success', '用户信息修改成功！')
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
      messageRemind  (type, info) {
        this.$message({message: info, type: type})
        return false
      }

    }
  }
</script>
