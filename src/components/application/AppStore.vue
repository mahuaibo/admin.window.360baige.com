<template>
  <div class="index">
    <div class="appStore-operatingArea">
      <el-input class="appStore-operatingArea-seek" placeholder="请输入名称..." icon="search"
                v-model="appStore.appSeek"
                :on-icon-click="handleIconClick"></el-input>
    </div>
    <div class="appStore-list">
      <div class="appStore-list-data">
        <div class="appStore-list-data-noData" v-if="appStoreData.appList==''">暂无数据</div>
        <div v-for="val in appStoreData.appList" class="appStore-app-card" v-else>
          <div class="appStore-list-data-card-left">
            <img :src="val.image" @click="appDetail(val)" class="appStore-list-data-card-left-img">
            <el-button class="appStore-list-data-card-left-button" type="primary" size="mini">
              <label v-if=" val.subscriptionStatus == 0" @click="subscribe(val)">订阅</label>
              <label v-else-if=" val.subscriptionStatus == 1" @click="unsubscribe(val)">退订</label>
            </el-button>
          </div>
          <div class="appStore-list-data-card-right">
            <div @click="appDetail(val)">
              <div class="appStore-list-data-card-right-name">{{ val.name }}</div>
              <div class="appStore-list-data-card-right-desc">{{ val.desc }}</div>
              <div class="appStore-list-data-card-right-price">￥{{ money(val.price) }}
                <label v-if="val.payCycle==1">/月</label>
                <label v-else-if="val.payCycle==2">/季</label>
                <label v-else-if="val.payCycle==3">/半年</label>
                <label v-else-if="val.payCycle==2">/年</label>
              </div>
            </div>
            <div class="appStore-list-data-card-right-subscription">订阅<label> {{ val.subscription }} </label>次</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'

  export default {
    created () {
      this.publicParameters.returnButtom = true
      this.publicParameters.path = '/application/center'
      this.initApplicationTplData(this.appStore)
    },
    computed: {
      ...mapGetters([
        'appStoreData',
        'publicParameters'
      ])
    },
    data () {
      return {
        appStore: {
          appSeek: null,
          appType: '0'
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick',
        'initApplicationTplData'
      ]),
      money (amount) {
        if (amount === 0) {
          return '0.00'
        } else {
          amount = amount / 100
          return amount.toFixed(2)
        }
      },
      handleIconClick (ev) {  // 搜索
        this.initApplicationTplData(this.appStore)
      },
      appDetail (val) { // 订阅
        this.handleClick('/application/appTplDetail?i=' + val.id)
      },
      // 订阅
      subscribe (data) {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/applicationTpl/subscribe',
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: data.id
          }
        }).then(function (response) {
          console.log(response.data.message)
          if (response.data.code === '200') {
            current.initApplicationTplData(current.appStore)
            current.messageRemind('success', response.data.message)
          } else {
            current.messageRemind('error', '应用订阅失败')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 退订
      unsubscribe (data) {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/applicationTpl/unSubscribe',
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: data.id
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.initApplicationTplData(current.appStore)
            current.messageRemind('success', response.data.message)
          } else {
            current.messageRemind('error', '应用退订失败')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .appStore-operatingArea {
    line-height: 36px;
    text-align: left;
    margin-top: 12px;
    padding: 0px 20px 32px 46px;
    .appStore-operatingArea-seek {
      width: 298px;
      height: 38px;
    }
  }

  .appStore-list {
    min-width: 1098px;
    height: calc(100vh - 175px);
    overflow-x: auto;
    overflow-y: auto;
    margin: 0px 20px 0px 20px;
    .appStore-list-data {
      width: 1093px;
      .appStore-list-noData {
        color: #5e7382;
        font-size: 14px;
      }
      .appStore-app-card {
        min-width: 216px;
        min-height: 106px;
        float: left;
        padding-left: 24px;
        padding-right: 24px;
        padding-bottom: 44px;
        .appStore-list-data-card-left {
          width: 70px;
          height: 106px;
          float: left;
          .appStore-list-data-card-left-img {
            width: 70px;
            height: 70px;
            border-radius: 20px;
          }
          .appStore-list-data-card-left-button {
            font-size: 12px;
            margin-top: 6px;
            width: 70px;
            height: 22px;
          }
        }
        .appStore-list-data-card-right {
          width: 130px;
          height: 108px;
          float: right;
          margin-left: 16px;
          text-align: left;
          .appStore-list-data-card-right-name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            color: #505050;
            margin-top: 2px;
          }
          .appStore-list-data-card-right-desc {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 14px;
            color: #808080;
            margin-top: 2px;
          }
          .appStore-list-data-card-right-price {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 12px;
            color: #ff5500;
            margin-top: 2px;
          }
          .appStore-list-data-card-right-subscription {
            margin-top: 16px;
            font-size: 12px;
            margin-bottom: 0px;
            height: 22px;
            line-height: 22px;
            text-align: right;
            color: #808080;
            span {
              color: #ff5500;
            }
          }
        }
      }
    }
  }
</style>
