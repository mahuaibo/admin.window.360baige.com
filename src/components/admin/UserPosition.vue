<template>
  <div class="admin-user-position">
    <div v-for="val in userPositionList.list" class="identityTab" @click="identitySwitch(val)"
         style="border: 1px solid #31a7ff;border-radius: 2px;">
      <label class="identityTab-identityImg">
        <img class="logo" :src="val.companyLogo" height="52" width="52"/>
      </label>
      <div class="identityTab-companyName">{{ val.companyName }}</div>
      <div class="identityTab-userPositionName">{{ val.userPositionName }}</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    created () {
      this.getUserPositionList()
    },
    computed: {
      ...mapGetters([
        'userPositionList',
        'publicParameters'
      ])
    },
    data () {
      return {
        userPositionId: localStorage.getItem('userPositionId')
      }
    },
    methods: {
      ...mapActions([
        'getUserPositionList'
      ]),
      identitySwitch (data) {
        if (data.userPositionId + '' === localStorage.getItem('userPositionId')) {
          return
        }
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/userPosition/getAccessToken',
          params: {
            accessValue: localStorage.getItem('accessTicket'),
            userPositionId: data.userPositionId
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            localStorage.setItem('positionName', '(' + data.userPositionName + ')')
            localStorage.setItem('userPositionId', data.userPositionId)
            localStorage.setItem('accessToken', response.data.data.accessToken)
            window.location.href = '#/application/center'
          } else {
            current.promptInfo('error', '角色切换失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      promptInfo (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .identityTab {
    float: left;
    margin: 10px -4px 16px 4px;
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
