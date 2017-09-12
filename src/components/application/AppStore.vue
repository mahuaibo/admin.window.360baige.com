<template>
  <div class="index">
    <div class="appStore-operatingArea">
      <div class="appCenter-seek">
        <el-input class="appStore-seek" placeholder="请输入名称..." icon="search" v-model="appStore.appSeek"
                  :on-icon-click="handleIconClick" style="width: 298px;height: 38px;"></el-input>
      </div>
      <!--<el-select v-model="appStore.appType" class="appStore-choicebox"> &lt;!&ndash; :visible-change="typeFilter()" &ndash;&gt;-->
      <!--<el-option v-for="item in appStoreData.appTypeList" :label="item.label" :value="item.value"></el-option>-->
      <!--</el-select>-->
    </div>
    <div class="appStore-list-div">
      <div class="appStore-list">
        <div class="appStore-list-noData" v-if="appStoreData.appList==''">暂无数据</div>
        <div v-for="val in appStoreData.appList" class="appStore-app-card" v-else>
          <div class="appStore-app-card-left">
            <img :src="val.image" @click="appDetail(val)" style="width: 70px;height: 70px;border-radius: 20px;">
            <el-button style="font-size:12px;margin-top:6px;width:70px;height:22px;" type="primary" size="mini">
              <label v-if=" val.subscriptionStatus == 0" @click="subscribe(val)">订阅</label>
              <label v-else-if=" val.subscriptionStatus == 1" @click="unsubscribe(val)">退订</label>
            </el-button>
          </div>
          <div class="appStore-app-card-right">
            <div @click="appSubscribe(val)">
              <div
                style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 16px;color: #505050;margin-top: 2px;">
                {{ val.name }}


              </div>
              <div
                style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 14px;color: #808080;margin-top: 2px;">
                {{ val.desc }}


              </div>
              <div
                style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;font-size: 12px;color: #ff5500;margin-top: 2px;">
                ￥{{ money(val.price) }}
                <label v-if="val.payCycle==1">/月</label>
                <label v-else-if="val.payCycle==2">/季</label>
                <label v-else-if="val.payCycle==3">/半年</label>
                <label v-else-if="val.payCycle==2">/年</label>
              </div>
            </div>
            <div class="subscription" style="margin-top: 16px;">订阅<label style="color: #ff5500;"> {{ val.subscription
              }} </label>次


            </div>
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
          return amount / 100
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
    height: 38px;
    padding-top: 12px;
    padding-bottom: 30px;
    .appCenter-seek {
      position: absolute;
      left: 42px;
    }
  }

  .appStore-list-div {
    width: 1098px;
    overflow: hidden;
    .appStore-list {
      width: 1093px;
      overflow-y: auto;
      overflow-x: hidden;
      margin-left: 20px;
      margin-right: 20px;
      height: calc(100vh - 150px);
    }
  }

  .appStore-app-card {
    width: 216px;
    height: 106px;
    float: left;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 44px;
    .appStore-app-card-left {
      width: 70px;
      height: 106px;
      float: left;
    }
    .appStore-app-card-right {
      width: 130px;
      height: 108px;
      float: right;
      margin-left: 16px;
      text-align: left;
    }
  }

  .subscription {
    font-size: 12px;
    margin-bottom: 0px;
    height: 22px;
    line-height: 22px;
    text-align: right;
    color: #808080;
  }

</style>
