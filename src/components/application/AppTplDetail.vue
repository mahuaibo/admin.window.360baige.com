<template>
  <div class="index">
    <div class="appTplDetail">
      <div class="appTplDetail-left">
        <img :src="appTplData.image" class="application-image">
        <div type="primary" size="mini" class="application-status" v-if="appTplData.subscriptionStatus==1">已订阅</div>
        <div type="primary" size="mini" class="application-status" v-else>未订阅</div>
      </div>
      <div class="appTplDetail-right">
        <div class="appTplDetail-right-name" id="productName">{{ appTplData.name }}</div>
        <el-button type="text" id="appTplDetail-right-descMore" @click="descMore(appTplData.desc)" v-if="this.showMore">
          <span>更多</span>
        </el-button>
        <div id="appTplDetail-right-desc">
          <label>{{ appTplData.desc }}</label>
          <el-button type="text" id="packUp" @click="packUpProfile">收起</el-button>
        </div>
        <div class="appTplDetail-right-feesDesc">
          <label>费用说明</label>
          <label class="appTplDetail-right-feesDesc-endTime">（服务截止: {{ appTplData.endTime }}）</label>
        </div>
        <div class="appTplDetail-right-feesExplain">该应用功能费用为
          <span class="appTplDetail-right-feesExplain-price">
          ￥{{ money(appTplData.price)}}/{{ appTplData.payCycle }}，您可根据需求选择订购。
          </span>
        </div>
        <!--<div style="padding-top: 6px;padding-bottom:24px;">{{ appTplData.priceDesc }}</div>-->
      </div>
    </div>
    <div class="appTplDetail-middle">
      <el-row :gutter="24">
        <el-col :span="6">产品</el-col>
        <el-col :span="6">单价</el-col>
        <el-col :span="6">数量</el-col>
        <el-col :span="6">金额</el-col>
      </el-row>
      <el-row :gutter="24" class="appTplDetail-middle-data">
        <el-col :span="6" class="appTplDetail-middle-data-product">
          <div class="appTplDetail-middle-data-product-data">
            <div class="appTplDetail-middle-data-product-price">￥{{ money(appTplData.price) }}</div>
            <div class="appTplDetail-middle-data-product-card">
              <div class="appTplDetail-middle-data-product-text">每{{ appTplData.payCycle }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="appTplDetail-middle-data-price">￥{{ money(appTplData.price) }}</div>
        </el-col>
        <el-col :span="6">
          <div class="appTplDetail-middle-data-num">
            <el-input-number size="small" v-model="number" @change="handleChange"
                             v-if="appTplData.price!=0||appTplData.price!=0.00" :min="1" :max="12"></el-input-number>
            <el-input-number size="small" v-model="number" @change="handleChange" :disabled="true" :min="1"
                             v-else :max="10"></el-input-number>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="appTplDetail-middle-data-totalPrice">￥{{ money(totalPrice) }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="appTplDetail-bottom">
      <div class="appTplDetail-bottom-payWay">支付方式</div>
      <div class="appTplDetail-bottom-img">
        <div v-model="payMode" id="appTplDetail-bottom-img-weChatPay" @click="optionPayMode('weChatPay')">
          <img src="../../assets/weixin.png" class="appTplDetail-bottom-imgs">
          <label class="appTplDetail-bottom-img-weChatText">微信</label>
        </div>
        <div v-model="payMode" id="appTplDetail-bottom-img-aliPay" @click="optionPayMode('aliPay')">
          <img src="../../assets/zhifubao.png" class="appTplDetail-bottom-imgs">
          <label class="appTplDetail-bottom-img-aliText">支付宝</label>
        </div>
      </div>
    </div>
    <button @click="immediatePayment2">立即支付</button>
    <div class="appTplDetail-immediatePayment">
      <el-button class="confirm-order" type="primary" @click="immediatePayment" v-if="status===0">立即支付</el-button>
    </div>
    <el-dialog title="微信支付" v-model="payDialog" size="large" :before-close="closeWindow" :close-on-click-modal="false">
      <div><img :src="payImage" height="256" width="256"/></div>
      <div class="pay-prompting">使用微信扫一扫支付</div>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    created () {
      this.publicParameters.returnButtom = true
      this.publicParameters.path = '/application/store'
      this.initAppTplDetail(this.showMore)
      if (typeof (this.$route.query.oId) !== 'undefined') {
        this.getOrderData(this.$route.query.oId)
      }
    },
    computed: {
      ...mapGetters([
        'publicParameters'
      ])
    },
    data () {
      return {
        orderId: 0,
        codeUrl: '',
        timing: null,
        payDialog: false,
        payMode: 1,
        showMore: false,
        number: 1,
        totalPrice: 0,
        payImage: '',
        status: 0,
        appTplData: {
          id: '',
          startTime: '',
          endTime: '',
          desc: '',
          image: '',
          name: '',
          payCycle: '',
          payType: '',
          price: '',
          priceDesc: '',
          subscriptionStatus: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick'
      ]),
      money (amount) {
        if (amount === 0) {
          return '0.00'
        } else {
          return amount / 100
        }
      },
      // 获取数据
      initAppTplDetail () {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/applicationTpl/detail',
          params: {
            accessToken: localStorage.getItem('accessToken'),
            applicationTplId: this.$route.query.i
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.appTplData = response.data.data
            current.totalPrice = current.appTplData.price * current.number
            if (response.data.data.desc.length > 39) {
              current.showMore = true
            }
          } else {
            current.messageRemind('error', response.data.message)
            current.handleClick('/application/store')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 获取订单数据
      getOrderData (orderId) {
        var current = this
        current.orderId = orderId
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/order/detail',
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: orderId
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.appTplData.price = response.data.data.price
            current.number = response.data.data.num
            current.status = response.data.data.status
            current.codeUrl = response.data.data.codeUrl
          } else {
            current.messageRemind('error', response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 计算总价
      handleChange (value) {
        this.number = value
        this.totalPrice = (this.appTplData.price * this.number).toFixed(2)
      },
      // 应用介绍->更多
      descMore (data) {
        var productDesc = document.getElementById('appTplDetail-right-desc')
        productDesc.style.height = Math.ceil(data.length / (document.getElementById('productName').clientWidth / 14)) * 24 + 6 + 'px'
        productDesc.style.width = '100%'
        document.getElementById('appTplDetail-right-descMore').style.display = 'none'
        document.getElementById('packUp').style.display = 'inline'
      },
      // 应用介绍->收起
      packUpProfile () {
        var productDesc = document.getElementById('appTplDetail-right-desc')
        productDesc.style.height = '24px'
        productDesc.style.width = '550px'
        document.getElementById('appTplDetail-right-descMore').style.display = 'inline'
        document.getElementById('packUp').style.display = 'none'
      },
      immediatePayment2 () {
        console.log('确认订单')
        var current = this
        if (current.orderId === 0) {
          axios({
            method: 'POST',
            url: this.publicParameters.domain + '/order/add',
            params: {
              accessToken: localStorage.getItem('accessToken'),
              applicationTplId: this.appTplData.id,
              num: this.number,
              payType: this.payMode
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
//              current.payDialog = true
              current.codeUrl = response.data.data.codeUrl
//              current.payImage = current.publicParameters.domain + '/order/qr?size=356&url=' + current.codeUrl
              window.location.href = current.codeUrl + '&redirect_url=http://wwww.360baige.com'
//              window.location.open(current.codeUrl)
              current.payStatusTimer(response.data.data.id)
              current.orderId = response.data.data.id
            }
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          if (current.codeUrl === '') {
            console.log('1，' + current.codeUrl)
//            current.payDialog = true
//            current.payImage = current.publicParameters.domain + '/order/qr?size=356&url=' + current.codeUrl
            window.location.href = current.codeUrl + '&redirect_url=http://wwww.360baige.com'
//            window.location.open(current.codeUrl)
            current.payStatusTimer(current.orderId)
          } else {
            console.log('2，' + current.codeUrl)
//            current.payDialog = true
//            current.payImage = current.publicParameters.domain + '/order/qr?size=356&url=' + current.codeUrl
            window.location.href = current.codeUrl + '&redirect_url=http://wwww.360baige.com'
//            window.location.open(current.codeUrl)
            current.payStatusTimer(current.orderId)
          }
        }
      },
      // 立即支付
      immediatePayment () {
        console.log('确认订单')
        var current = this
        if (current.orderId === 0) {
          axios({
            method: 'POST',
            url: this.publicParameters.domain + '/order/add',
            params: {
              accessToken: localStorage.getItem('accessToken'),
              applicationTplId: this.appTplData.id,
              num: this.number,
              payType: this.payMode
            }
          }).then(function (response) {
            console.log(response.data)
            if (response.data.code === '200') {
              current.payDialog = true
              current.codeUrl = response.data.data.codeUrl
              current.payImage = current.publicParameters.domain + '/order/qr?size=356&url=' + current.codeUrl
              current.payStatusTimer(response.data.data.id)
              current.orderId = response.data.data.id
            }
          }).catch(function (error) {
            console.log(error)
          })
        } else {
          if (current.codeUrl === '') {
            console.log('1，' + current.codeUrl)
            current.payDialog = true
            current.payImage = current.publicParameters.domain + '/order/qr?size=356&url=' + current.codeUrl
            current.payStatusTimer(current.orderId)
          } else {
            console.log('2，' + current.codeUrl)
            current.payDialog = true
            current.payImage = current.publicParameters.domain + '/order/qr?size=356&url=' + current.codeUrl
            current.payStatusTimer(current.orderId)
          }
        }
      },
      // 定时获取支付状态
      payStatusTimer (orderId) {
        var current = this
        if (typeof (orderId) !== 'undefined') {
          current.timing = setInterval(function () {
            axios({
              method: 'POST',
              url: current.publicParameters.domain + '/order/payResult',
              params: {
                accessToken: localStorage.getItem('accessToken'),
                id: orderId
              }
            }).then(function (response) {
              console.log(response.data)
              if (response.data.code === '200') {
                var tradeState = response.data.data.tradeState
                if (tradeState === 'SUCCESS') {
                  clearInterval(current.timing)
                  current.payDialog = false
                  current.orderId = 0
                  current.codeUrl = ''
                  current.handleClick('/application/center')
                } else if (tradeState !== 'NOTPAY' && tradeState !== 'USERPAYING') {
                  console.log(tradeState)
                  clearInterval(current.timing)
                  current.payDialog = false
                  current.messageRemind('error', '支付失败')
                }
              }
            }).catch(function (error) {
              console.log(error)
            })
          }, 3000)
        }
      },
      closeWindow () {
        clearInterval(this.timing)
        this.payDialog = false
      },
      // 切换支付方式
      optionPayMode (index) {
        if (index === 'weChatPay') {
          document.getElementById(index).style.border = '1px solid #ff5f27'
          document.getElementById('appTplDetail-bottom-img-aliPay').style.border = '1px solid #f0f0f0'
          document.getElementById('appTplDetail-bottom-img-aliPay').style.borderLeft = '0px solid #ffffff'
        } else {
          this.messageRemind('warning', '猿类努力开发中...')
//          document.getElementById(index).style.border = '1px solid #ff5f27'
//          document.getElementById('appTplDetail-bottom-img-weChatPay').style.border = '1px solid #f0f0f0'
//          document.getElementById('appTplDetail-bottom-img-weChatPay').style.borderRadius = '0px solid #ffffff'
        }
      },
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .el-radio__label {
    padding-left: 24px;
  }

  .el-dialog {
    width: 300px;
    .el-dialog__body {
      padding: 0px 0px 10px 0px;
    }
  }

  .index {
    min-width: 830px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .appTplDetail {
    font-size: 14px;
    min-height: 118px;
    border-bottom: 1px solid #f0f0f0;
    .appTplDetail-left {
      width: 70px;
      height: 106px;
      float: left;
      .application-image {
        width: 70px;
        height: 70px;
        border-radius: 20px;
      }
      .application-status {
        color: #ffffff;
        font-size: 12px;
        border: 1px solid #20a0ff;
        border-radius: 3px;
        background-color: #20a0ff;
        margin-top: 6px;
        width: 68px;
        height: 22px;
        line-height: 22px;
      }
    }
    .appTplDetail-right {
      margin-top: 12px;
      padding-left: 132px;
      text-align: left;
      .appTplDetail-right-name {
        color: #505050;
        font-weight: bold;
      }
      #appTplDetail-right-descMore {
        float: right;
      }
      #appTplDetail-right-desc {
        padding-top: 6px;
        height: 24px;
        width: 550px;
        overflow: hidden
      }
      #packUp {
        display: none;
        float: right;
      }
      .appTplDetail-right-feesDesc {
        color: #505050;
        font-weight: bold;
        padding-top: 12px;
        .appTplDetail-right-feesDesc-endTime {
          font-size: 12px;
          font-weight: normal;
        }
      }
      .appTplDetail-right-feesExplain {
        padding-top: 6px;
        padding-bottom: 24px;
        .appTplDetail-right-feesExplain-price {
          color: #ff5f27;
          font-weight: bold;
        }
      }
    }
  }

  .appTplDetail-middle {
    font-size: 14px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f0f0f0;
    .appTplDetail-middle-data {
      padding-top: 6px;
      .appTplDetail-middle-data-product {
        padding-left: 12px;
        .appTplDetail-middle-data-product-data {
          min-width: 222px;
          max-width: 222px;
          height: 102px;
          line-height: 102px;
          border: 1px solid #ff5f27;
          background-color: #ff5f27;
          font-size: 14px;
          .appTplDetail-middle-data-product-price {
            float: left;
            width: 163px;
            height: 100px;
            font-size: 24px;
            color: #ff5f27;
            background: #ffffff;
          }
          .appTplDetail-middle-data-product-card {
            float: right;
            background-color: #f0f0f0;
            width: 57px;
            height: 100px;
            border-bottom-right-radius: 25px;
          }
          .appTplDetail-middle-data-product-text {
            margin: 20px;
            min-width: 20px;
            min-height: 57px;
            line-height: 25px;
          }
        }
      }
      .appTplDetail-middle-data-price {
        height: 104px;
        line-height: 104px;
      }
      .appTplDetail-middle-data-num {
        height: 70px;
        padding-top: 34px;
      }
      .appTplDetail-middle-data-totalPrice {
        height: 104px;
        line-height: 104px;
        color: #ff5f27;
      }
    }
  }

  .appTplDetail-bottom {
    text-align: left;
    padding-top: 24px;
    .appTplDetail-bottom-payWay {
      color: #505050;
      font-weight: bold;
    }
    .appTplDetail-bottom-img {
      width: 222px;
      height: 42px;
      margin-top: 24px;
    }
    #appTplDetail-bottom-img-weChatPay {
      height: 42px;
      line-height: 42px;
      border: 1px solid #ff5f27;
      display: inline-block;
      width: 49%;
      .appTplDetail-bottom-img-weChatText {
        padding-left: 6px;
        letter-spacing: 14px;
      }
    }
    #appTplDetail-bottom-img-aliPay {
      height: 42px;
      line-height: 42px;
      display: inline-block;
      width: 49%;
      border-top: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      float: right;
      .appTplDetail-bottom-img-aliText {
        padding-left: 6px;
      }
    }
    .appTplDetail-bottom-imgs {
      width: 20px;
      height: 20px;
      margin-left: 16px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }

  .appTplDetail-immediatePayment {
    float: right;
    text-align: right;
    width: 100%
  }

  .pay-prompting {
    padding-bottom: 40px;
  }

  .confirm-order {
    margin-top: 6px;
    width: 107px;
    height: 30px;
    padding: 6px 15px 7px 15px;
  }

</style>
