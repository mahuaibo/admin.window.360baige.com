<template>
  <div class="common-header">
    <div class="common-header-return" v-if="publicParameters.returnButtom">
      <el-button class="common-header-return-button" type="text" @click="handleClick(publicParameters.path)">
        <img src="../../assets/back.png"/>
        <label>返回</label>
      </el-button>
    </div>
    <div class="common-header-right">
      <img class="roleLogo" :src="publicParameters.head" height="24" width="24"/>
      <div class="operating-menu">
        <div class="operating-menu-content">
          <div class="operating-menu-item" @click="openBox('identity')" @mouseover="moveShow('changeIdentity')"
               @mouseout="moutShow('changeIdentity')">
            <img class="operating-menu-item-logo" src='../../assets/change_identity.png' v-if="changeIdentity==1"/>
            <img class="operating-menu-item-logo" src='../../assets/change_identity2.png' v-else/>
            <label>{{ publicParameters.name }}</label>
          </div>
          <div class="operating-menu-item" @click="openBox('company')" @mouseover="moveShow('companyInfor')"
               @mouseout="moutShow('companyInfor')">
            <img class="operating-menu-item-logo" src="../../assets/company_infor.png" v-if="companyInfor==1"/>
            <img class="operating-menu-item-logo" src="../../assets/company_infor2.png" v-else/>
            <label>企业信息</label>
          </div>
          <div class="operating-menu-item" @click="openBox('admin')" @mouseover="moveShow('userInfor')"
               @mouseout="moutShow('userInfor')">
            <img class="operating-menu-item-logo" src="../../assets/user_infor.png" v-if="userInfor==1"/>
            <img class="operating-menu-item-logo" src="../../assets/user_infor2.png" v-else/>
            <label>用户信息</label>
          </div>
          <div class="operating-menu-item" @click="openBox('password')" @mouseover="moveShow('modifyPassword')"
               @mouseout="moutShow('modifyPassword')">
            <img class="operating-menu-item-logo" src="../../assets/modify_password.png" v-if="modifyPassword==1"/>
            <img class="operating-menu-item-logo" src="../../assets/modify_password2.png" v-else/>
            <label>密码修改</label>
          </div>
          <div class="operating-menu-item" @click="logout" @mouseover="moveShow('quit')"
               @mouseout="moutShow('quit')">
            <img class="operating-menu-item-logo" src="../../assets/quit.png" v-if="quit==1"/>
            <img class="operating-menu-item-logo" src="../../assets/quit2.png" v-else/>
            <label>退出</label>
          </div>
        </div>
        <s><i></i></s>
      </div>
    </div>
    <div class="common-header-left">
      <img class="messageLogo" src="../../assets/message.png" height="24" width="24"/>
      <div class="message">
        <div class="message-content">
          <div class="message-item-head">
            <label class="message-item-head-name">消息</label>
            <label class="message-item-head-operation">清空</label>
          </div>
          <div class="message-item" v-for="val in messageList.list">{{ val.title }} </div>
          <div class="message-item-bottom" @click="viewAll">查看全部</div>
        </div>
        <s><i></i></s>
      </div>
    </div>
    <div class="dialog">
      <el-dialog title="选择身份" :visible.sync="publicParameters.identityListDialog" :close-on-click-modal="false">
        <admin-user-position></admin-user-position>
      </el-dialog>
      <el-dialog title="企业信息" :visible.sync="publicParameters.companyInfoDialog" :close-on-click-modal="false">
        <company-info></company-info>
      </el-dialog>
      <el-dialog title="用户信息" :visible.sync="publicParameters.adminInfoDialog" :close-on-click-modal="false">
        <admin-info></admin-info>
      </el-dialog>
      <el-dialog title="密码修改" :visible.sync="publicParameters.modifyPwdDialog" :close-on-click-modal="false">
        <modify-pwd></modify-pwd>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import AdminUserPosition from '@/components/admin/UserPosition'
  import CompanyInfo from '@/components/company/Info'
  import AdminInfo from '@/components/admin/Info'
  import ModifyPwd from '@/components/admin/ModifyPwd'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    components: {AdminUserPosition, CompanyInfo, AdminInfo, ModifyPwd},
    created () {
      this.publicParameters.head = localStorage.getItem('head')
    },
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
        changeIdentity: 1,
        companyInfor: 1,
        userInfor: 1,
        modifyPassword: 1,
        quit: 1,
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
        'getUserPositionList'
      ]),
      // 移入
      moveShow (key) {
        if (key === 'changeIdentity') {
          this.changeIdentity = 2
        } else if (key === 'companyInfor') {
          this.companyInfor = 2
        } else if (key === 'userInfor') {
          this.userInfor = 2
        } else if (key === 'modifyPassword') {
          this.modifyPassword = 2
        } else if (key === 'quit') {
          this.quit = 2
        }
      },
      // 移出
      moutShow (key) {
        if (key === 'changeIdentity') {
          this.changeIdentity = 1
        } else if (key === 'companyInfor') {
          this.companyInfor = 1
        } else if (key === 'userInfor') {
          this.userInfor = 1
        } else if (key === 'modifyPassword') {
          this.modifyPassword = 1
        } else if (key === 'quit') {
          this.quit = 1
        }
      },
      openBox (key) {
        if (key === 'identity') {
          this.publicParameters.identityListDialog = true
          this.getUserPositionList()
        } else if (key === 'company') {
          this.publicParameters.companyInfoDialog = true
        } else if (key === 'admin') {
          this.publicParameters.adminInfoDialog = true
        } else if (key === 'password') {
          this.publicParameters.modifyPwdDialog = true
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
              localStorage.removeItem('head')
              localStorage.removeItem('positionName')
              localStorage.removeItem('accessTicket')
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
      viewAll () {
        console.log('查看全部。。。')
      },
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-dialog {
    width: 456px;
    .el-dialog__body {
      padding: 12px 8px 6px 0px;
    }
    .el-form-item {
      margin: 14px 14px 20px 14px;
    }
  }

  .el-dialog__header {
    background-color: #31a7ff;
    padding: 0px;
    margin: 0px;
    height: 55px;
    line-height: 60px;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    text-align: left;
    padding-left: 20px;
    .el-dialog__title {
      color: #ffffff;
      font-size: 18px;
      font-weight: normal;
    }
    .el-dialog__headerbtn {
      padding-top: 20px;
      padding-right: 20px;
      .el-icon-close {
        color: #ffffff;
      }
    }
  }

  .el-table th {
    text-align: center;
  }

  .common-header-return {
    float: left;
    height: 58px;
    line-height: 58px;
    margin-left: 40px;
    .common-header-return-button {
      font-size: 14px;
      color: #505050;
      img {
        padding-top: 1px;
        width: 12px;
        height: 12px;
      }
    }
  }

  .common-header-right {
    float: right;
    width: 104px;
    height: 58px;
    text-align: left;
    border-left: 1px solid #cbc9ca;
    .roleLogo {
      position: relative;
      top: 18px;
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
    top: 58px;
    right: 42px;
    font-size: 14pt;
    min-height: 170px;
    min-width: 170px;
    z-index: 1000;
    text-align: left;
    display: none;
    .operating-menu-content {
      padding: 5px 0px 5px 0px;
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
          height: 16px;
          width: 16px;
          position: relative;
          top: 4px;
          margin-right: 12px;
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
      right: 16px;
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
    right: -8px;
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
        .message-item-head-name {
          position: absolute;
          left: 25px;
          color: #505050;
          font-size: 14px;
        }
        .message-item-head-operation {
          position: absolute;
          right: 25px;
          font-size: 12px;
          color: #808080;
        }
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

        font-family: ms sans serif, arial;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

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
      top: -18px;
      right: 135px;
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
    width: 74px;
    height: 58px;;
    text-align: right;
    .messageLogo {
      position: relative;
      top: 18px;
      right: 22px;
    }
    .message {
      padding-top: 2px;
    }
  }

</style>
