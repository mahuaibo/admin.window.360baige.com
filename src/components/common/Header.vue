<template>
  <div class="common-header">
    <div class="common-header-return" v-if="publicParameters.returnButtom">
      <el-button style="font-size: 14px;color: #505050;" type="text" @click="handleClick(publicParameters.path)">＜返回</el-button>
    </div>
    <div class="common-header-right">
      <img class="roleLogo" src="../../assets/qq.png" height="30" width="30"/>
      <div class="operating-menu">
        <div class="operating-menu-content">
          <div class="operating-menu-item" @click="openBox('identity')">
            <img class="operating-menu-item-logo" src="../../assets/qq.png" height="15" width="15"/>
            <label>{{ name }}</label>
          </div>
          <div class="operating-menu-item" @click="openBox('company')">
            <img class="operating-menu-item-logo" src="../../assets/qq.png" height="15" width="15"/>
            <label>企业信息</label>
          </div>
          <div class="operating-menu-item" @click="openBox('admin')">
            <img class="operating-menu-item-logo" src="../../assets/qq.png" height="15" width="15"/>
            <label>用户信息</label>
          </div>
          <div class="operating-menu-item" @click="openBox('password')">
            <img class="operating-menu-item-logo" src="../../assets/qq.png" height="15" width="15"/>
            <label>密码修改</label>
          </div>
          <div class="operating-menu-item" @click="logout">
            <img class="operating-menu-item-logo" src="../../assets/qq.png" height="15" width="15"/>
            <label>退出</label>
          </div>
        </div>
        <s><i></i></s>
      </div>
    </div>
    <div class="common-header-left">
      <img class="messageLogo" src="../../assets/inform.png" height="30" width="30"/>
      <div class="message">
        <div class="message-content">
          <div class="message-item-head">
            <label style="position:absolute;left: 25px;color:#505050;font-size: 14px;">消息</label>
            <label style="position:absolute;right:25px;font-size: 12px;color: #808080;">清空</label>
          </div>
          <div class="message-item" v-for="val in messageList.list">
{{ val.title }}</div>
          <div class="message-item-bottom">查看全部</div>
        </div>
        <s><i></i></s>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="切换身份" :visible.sync="identityListDialog" style="width: 992px;margin: 0 auto">
        <div v-for="val in userPositionList.list" class="identityTab" @click="identitySwitch(val)"
             v-if="val.userPositionId==userPositionId" style="border: 1px solid #31a7ff;border-radius: 2px;">
          <label class="identityTab-identityImg">
            <img class="logo" :src="val.companyLogo" height="52" width="52"/>
          </label>
          <div class="identityTab-companyName">{{ val.companyName }}</div>
          <div class="identityTab-userPositionName">{{ val.userPositionName }}</div>
        </div>
        <div v-for="val in userPositionList.list" class="identityTab" @click="identitySwitch(val)" v-else="">
          <label class="identityTab-identityImg">
            <img class="logo" :src="val.companyLogo" height="52" width="52"/>
          </label>
          <div class="identityTab-companyName">{{ val.companyName }}</div>
          <div class="identityTab-userPositionName">{{ val.userPositionName }}</div>
        </div>
      </el-dialog>
      <el-dialog title="用户信息" :visible.sync="adminInfoDialog" style="width: 992px;margin: 0 auto">
        <el-form :model="myData" :rules="userInfoRules" ref="myData" label-width="75px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input placeholder="请输入用户名" v-model="myData.username" class="registerForm-input">
              <template slot="prepend">用 &nbsp;户&nbsp; 名</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input placeholder="请输入用户名" v-model="myData.phone" class="registerForm-input">
              <template slot="prepend">手机号码</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input placeholder="请输入用户名" v-model="myData.email" class="registerForm-input">
              <template slot="prepend">邮 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 箱</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 456px;float: right" type="success" @click="submitForm('myData')">修改</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  //  import router from '../.././router'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'publicParameters',
        'userPositionList',
        'messageList'
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
        identityListDialog: false,
        adminInfoDialog: false,
        name: localStorage.getItem('username'),
        userPositionId: localStorage.getItem('userPositionId'),
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
        'handleClick',
        'getUserPositionList',
        'initMyInfoData'
      ]),
      openBox (key) {
        if (key === 'identity') {
          this.getUserPositionList()
          this.identityListDialog = true
        } else if (key === 'admin') {
          this.initMyInfoData(this.myData)
          this.adminInfoDialog = true
        }
      },
      logout () {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios({
            method: 'POST',
            url: this.publicParameters.domain + '/user/logout',
            params: {
              access_token: localStorage.getItem('accessTicket')
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              localStorage.removeItem('username')
              localStorage.removeItem('userPositionId')
              localStorage.removeItem('accessToken')
              window.location.href = '#/admin/login'
            } else {
              window.location.href = '#/'
            }
          }).catch(function (error) {
            console.log(error)
          })
        }).catch(() => {
          console.log('取消操作！')
        })
      },
      identitySwitch (data) {
        console.log(data.userPositionId)
        console.log(this.userPositionId)
        if (data.userPositionId + '' === this.userPositionId + '') {
          this.messageRemind('warning', '傻B别瞎切换...')
          return
        }
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/userPosition/getAccessToken',
          params: {
            accessTicket: localStorage.getItem('accessTicket'),
            userPositionId: data.userPositionId
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            localStorage.setItem('accessToken', response.data.data.accessToken)
            window.location.href = '#/application/center'
          } else {
            current.promptInfo('error', '角色切换失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var current = this
            axios({
              method: 'GET',
              url: this.publicParameters.domain + '/user/modify',
              params: {
                access_token: localStorage.getItem('accessToken'),
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
      messageRemind  (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .common-header-return {
    float: left;
    height: 58px;
    line-height: 58px;
    margin-left: 40px;
  }

  .common-header-right {
    float: right;
    width: 104px;
    height: 58px;
    text-align: left;
    border-left: 1px solid #cbc9ca;
    .roleLogo {
      position: relative;
      top: 14px;
      left: 22px;
    }
  }

  .common-header-right:hover {
    .operating-menu {
      display: block;
    }
  }

  .common-header-left:hover {
    .message {
      display: block;
    }
  }

  .operating-menu {
    position: absolute;
    top: 56px;
    right: 60px;
    font-size: 14pt;
    min-height: 170px;
    min-width: 170px;
    z-index: 1000;
    text-align: left;
    display: none;
    .operating-menu-content {
      border: 1px solid #e9e9e9;
      border-radius: 5px;
      position: absolute;
      background-color: #ffffff;
      .operating-menu-item {
        font-size: 14px;
        color: #505050;
        width: 170px;
        height: 34px;
        line-height: 34px;
        padding-left: 18px;
        .operating-menu-item-logo {
          position: relative;
          top: 2px;
          margin-right: 16px;
        }
      }
      .operating-menu-item:hover {
        color: #ffffff;
        background-color: #31a7ff;
      }
    }
    s {
      position: absolute;
      top: -20px;
      right: -4px;
      border-color: transparent transparent #e9e9e9 transparent;
      border-style: dashed dashed solid dashed;
      border-width: 10px;
    }

    i {
      position: absolute;
      top: -9px;
      left: -10px;
      border-color: transparent transparent #ffffff transparent;
      border-style: dashed dashed solid dashed;
      border-width: 10px;
    }
  }

  .message {
    position: absolute;
    top: 56px;
    right: 42px;
    font-size: 14pt;
    min-height: 242px;
    min-width: 322px;
    z-index: 1000;
    text-align: left;
    display: none;
    .message-content {
      border: 1px solid #e9e9e9;
      border-radius: 5px;
      position: absolute;
      background-color: #ffffff;
      .message-item-head {
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e9e9e9;
      }
      .message-item {
        color: #505050;
        font-size: 12px;
        width: 272px;
        height: 54px;
        line-height: 54px;
        padding-left: 25px;
        padding-right: 25px;
        border-bottom: 1px solid #f6f6f6;
      }
      .message-item:hover {
        color: #ffffff;
        background-color: #31a7ff;
      }
      .message-item-bottom {
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-top: 1px solid #e9e9e9;
      }
    }
    s {
      position: absolute;
      top: -20px;
      right: 90px;
      border-color: transparent transparent #e9e9e9 transparent;
      border-style: dashed dashed solid dashed;
      border-width: 10px;
    }

    i {
      position: absolute;
      top: -9px;
      left: -10px;
      border-color: transparent transparent #ffffff transparent;
      border-style: dashed dashed solid dashed;
      border-width: 10px;
    }
  }

  .common-header-left {
    float: right;
    width: 104px;
    height: 58px;;
    text-align: right;
    .messageLogo {
      position: relative;
      top: 14px;
      right: 22px;
    }
  }

  .identityTab {
    float: left;
    margin-bottom: 16px;
    width: 220px;
    height: 72px;
    border: 1px solid #ffffff;
    .identityTab-identityImg {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      margin-right: 17px;
    }
    .identityTab-companyName {
      width: 140px;
      float: right;
      margin-top: 18px;
      text-align: left;
      color: #505050;
    }
    .identityTab-userPositionName {
      width: 140px;
      margin-top: 14px;
      text-align: left;
      color: #31a7ff;
    }
  }

  .identityTab:hover {
    border: 1px solid #31a7ff;
    border-radius: 2px;
  }
</style>
