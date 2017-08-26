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
    <div class="appStore-list">
      <div class="appStore-list-noData" v-if="appStoreData.appList==''">暂无数据</div>
      <div v-for="val in appStoreData.appList" class="appStore-app-card" v-else>
        <div class="appStore-app-card-left">
          <img :src="val.image" style="width: 70px;height: 70px;border-radius: 20px;">
          <el-button type="primary" size="mini" style=" margin-top: 6px;width: 70px;height: 22px;"
                     @click="appSubscribe(val)">100$每天
          </el-button>
        </div>
        <div class="appStore-app-card-right">
          <div style="font-size: 16px;margin-top: 2px;color: #505050;">{{ val.name }}</div>
          <div style="font-size: 14px;margin-top: 4px;width: 130px;color: #808080;">{{ val.desc }}</div>
          <div style="font-size: 12px;margin-top: 34px;height:22px;line-height:22px;text-align:right;color: #808080;">
            已订阅<label style="color: #fe4f4f;"> 100 </label>次

          </div>
        </div>
      </div>
    </div>
    <!--<el-dialog title="详情" :visible.sync="appStore.detailModal" size="tiny" :before-close="cancel">-->
      <!--<el-form ref="form" :model="detailForm" label-width="90px">-->
        <!--<el-form-item label="应用图标：">{{ detailForm.img }}</el-form-item>-->
        <!--<el-form-item label="应用名称：">{{ detailForm.name }}</el-form-item>-->
        <!--<el-form-item label="应用简介：">{{ detailForm.brief }}</el-form-item>-->
        <!--<el-form-item label="价格：">{{ detailForm.price }}</el-form-item>-->
        <!--<el-form-item label="开发公司：">{{ detailForm.companyName }}</el-form-item>-->
        <!--<el-form-item label="开发时间：">{{ detailForm.time }}</el-form-item>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
    <!--<el-dialog title="付费说明" :visible.sync="appStore.orderModal" size="tiny" :before-close="cancel">-->
      <!--<el-form ref="form" :model="orderForm" label-width="90px">-->
        <!--<el-form-item label="付费说明：">{{ orderForm.payType }}</el-form-item>-->
        <!--<el-form-item label="缴费选项：">{{ orderForm.payCycle }}</el-form-item>-->
        <!--<el-form-item label="支付方式：">{{ orderForm.payWay }}</el-form-item>-->
        <!--<span class="wrapper">-->
          <!--<el-button type="success" @click="appSubscribe('')"> 确定订单 </el-button>-->
        <!--</span>-->
      <!--</el-form>-->
    <!--</el-dialog>-->
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
//          detailModal: false,
//          orderModal: false
        }
//        detailForm: {
//          img: null,
//          name: null,
//          brief: null,
//          price: null,
//          companyName: null,
//          time: null
//        },
//        orderForm: {
//          appId: null,
//          payType: null,
//          payCycle: null,
//          payWay: null
//        }
      }
    },
    methods: {
      ...mapActions([
        'initApplicationTplData'
      ]),
      handleIconClick (ev) {  // 搜索
        this.initApplicationTplData(this.appStore)
      },
      cancel () { // 点击取消清空表单
//        this.appStore.detailModal = false
//        this.appStore.orderModal = false
      },
//      typeFilter () { // 类型过滤
//        this.initApplicationTplData(this.appStore)
//      },
//      selectAppSubscribe (val) { // 订阅详情
//        var current = this
//        current.orderForm.appId = val
//        axios({
//          method: 'GET',
//          url: this.publicParameters.domain + '/applicationTpl/detail',
//          params: {
//            access_token: localStorage.getItem('accessToken'),
//            id: val
//          }
//        }).then(function (response) {
//          console.log(response.data)
//          if (response.data.code === '200') {
//            current.orderForm.payType = response.data.data.pay_type
//            current.orderForm.payCycle = response.data.data.pay_cycle
//          }
//        }).catch(function (error) {
//          console.log(error)
//        })
//        this.appStore.orderModal = true
//      },
      appSubscribe (val) { // 订阅
        var current = this
        axios({
          method: 'GET',
          url: this.publicParameters.domain + '/applicationTpl/subscription',
          params: {
            access_token: localStorage.getItem('accessToken'),
            id: current.orderForm.appId
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.messageRemind('success', '订阅成功！')
            current.initApplicationTplData(current.appStore)
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.appStore.orderModal = false
      },
//      enterApp (index) { // 进入应用
//        console.log(index)
//      },
      messageRemind  (type, info) { // type success成功   warning警告   error失败
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

  .appStore-list {
    position: absolute;
    left: 20px;
    right: 20px;
    height: calc(100vh - 150px);
    overflow: scroll;
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

</style>
