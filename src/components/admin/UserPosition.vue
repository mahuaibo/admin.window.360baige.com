<template>
  <div class="admin-user-position">
    <div v-for="val in userPositionList.list" class="identityTab" @click="identitySwitch(val)">
      <div class="admin-user-position-userPosition current-userPosition" v-if="val.userPositionId==userPositionId">
        <label class="identityTab-identityImg">
          <img :src="val.companyLogo" height="52" width="52"/>
        </label>
        <div class="identityTab-companyName">{{ val.companyName }}</div>
        <div class="identityTab-userPositionName">{{ val.userPositionName }}</div>
      </div>
      <div class="admin-user-position-userPosition" v-else>
        <label class="identityTab-identityImg">
          <img :src="val.companyLogo" height="52" width="52"/>
        </label>
        <div class="identityTab-companyName">{{ val.companyName }}</div>
        <div class="identityTab-userPositionName">{{ val.userPositionName }}</div>
      </div>
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
        if (data.userPositionId + '' === this.userPositionId) {
          return
        }
        var params = {}
        if (localStorage.getItem('accessToken')) {
          params = {
            accessType: 1,
            accessValue: localStorage.getItem('accessToken'),
            userPositionId: data.userPositionId
          }
        } else {
          params = {
            accessValue: localStorage.getItem('accessTicket'),
            userPositionId: data.userPositionId
          }
        }
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/userPosition/getAccessToken',
          params
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            localStorage.setItem('positionName', '(' + data.userPositionName + ')')
            current.publicParameters.name = localStorage.getItem('username') + localStorage.getItem('positionName')
            localStorage.setItem('userPositionId', data.userPositionId)
            localStorage.setItem('accessToken', response.data.data.accessToken)
            current.userPositionId = data.userPositionId
            current.publicParameters.identityListDialog = false
            window.opener = null
            window.open(window.location.origin + '#/application/center', '_self')
            window.close()
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
    margin: 10px 0px 16px 18px;
    width: 200px;
    height: 72px;
    border: 1px solid #ffffff;
    .current-userPosition {
      width: 202px;
      height: 74px;
      border: 1px solid #31a7ff;
      border-radius: 2px;
    }
    .admin-user-position-userPosition:hover {
      cursor: pointer;
      width: 202px;
      height: 74px;
      border: 1px solid #31a7ff;
      border-radius: 2px;
    }
    .identityTab-identityImg {
      float: left;
      margin-left: 10px;
      margin-top: 10px;
      margin-right: 17px;
    }
    .identityTab-companyName {
      overflow: hidden !important;
      text-overflow: ellipsis !important;
      white-space: nowrap !important;
      width: 118px;
      float: right;
      margin-top: 18px;
      text-align: left;
      color: #505050;
    }
    .identityTab-userPositionName {
      width: 118px;
      float: right;
      text-align: left;
      color: #31a7ff;
    }
  }
</style>
