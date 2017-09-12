<template>
  <div class="index">
    <div class="tplDetail-head">
      <div class="tplDetail-head-left">
        <img :src="appTplData.image" class="application-image">
        <div type="primary" size="mini" class="application-status" v-if="appTplData.subscriptionStatus==1">已订阅</div>
        <div type="primary" size="mini" class="application-status" v-else>未订阅</div>
      </div>
      <div class="tplDetail-head-right">
        <div style="color: #505050;font-weight:bold;" id="productName">{{ appTplData.name }}</div>
        <el-button type="text" id="more" @click="unfurledProfile(appTplData.desc)" v-if="this.showMore">更多</el-button>
        <div id="product-desc">
          <label>{{ appTplData.desc }}</label>
          <el-button type="text" id="packUp" style="float:right;" @click="packUpProfile">收起</el-button>
        </div>
        <div class="data-feesDesc">
          <label>费用说明</label>
          <label style="font-size: 12px;font-weight:normal;">（服务截止: {{ appTplData.endTime }}）</label>
        </div>
        <div style="padding-top: 6px;padding-bottom:24px;">该应用功能费用为<span
          style="color: #ff5f27;font-weight: bold;">￥{{ money(appTplData.price)
          }}/{{ appTplData.payCycle }}</span>，您可根据需求选择订购。
        </div>
        <!--<div style="padding-top: 6px;padding-bottom:24px;">{{ appTplData.priceDesc }}</div>-->
      </div>
    </div>
    <div class="tplDetail-middle">
      <el-row :gutter="24">
        <el-col :span="6">产品</el-col>
        <el-col :span="6">单价</el-col>
        <el-col :span="6">数量</el-col>
        <el-col :span="6">金额</el-col>
      </el-row>
      <el-row :gutter="24" style="padding-top: 6px;">
        <el-col :span="6" style="padding-left: 12px;">
          <div class="data-product">
            <div class="data-product-price">￥{{ money(appTplData.price) }}</div>
            <div class="data-product-card">
              <div class="data-product-text">每{{ appTplData.payCycle }}</div>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="height: 104px;line-height: 104px;">￥{{ money(appTplData.price) }}</div>
        </el-col>
        <el-col :span="6">
          <div style="height:70px;padding-top: 34px;">
            <el-input-number size="small" v-model="number" @change="handleChange"
                             v-if="appTplData.price!=0||appTplData.price!=0.00" :min="1" :max="12"></el-input-number>
            <el-input-number size="small" v-model="number" @change="handleChange" :disabled="true" :min="1"
                             v-else :max="10"></el-input-number>
          </div>
        </el-col>
        <el-col :span="6">
          <div style="height: 104px;line-height: 104px;color: #ff5f27;">￥{{ money(totalPrice) }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="tplDetail-bottom">
      <div style="color: #505050;font-weight:bold;">支付方式</div>
      <div style="width: 222px;height:42px;margin-top: 24px;">
        <div v-model="payMode" id="weChatPay" @click="optionPayMode('weChatPay')">
          <img src="../../assets/weixin.png" class="pay-image">
          <label style="padding-left:6px;letter-spacing:14px;">微信</label>
        </div>
        <div v-model="payMode" id="aliPay" @click="optionPayMode('aliPay')">
          <img src="../../assets/zhifubao.png" class="pay-image">
          <label style="padding-left:6px; ">支付宝</label>
        </div>
      </div>
    </div>
    <div style="float:right;text-align:right;width: 100%">
      <el-button class="confirm-order" type="primary" @click="immediatePayment" v-if="status===0">立即支付


      </el-button>
    </div>
    <el-dialog title="微信支付" v-model="payDialog" size="large" :before-close="closeWindow" :close-on-click-modal="false">
      <div><img :src="payImage" height="256" width="256"/></div>
      <div>使用微信扫一扫支付</div>
      <div style="height:40px;"></div>
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
      unfurledProfile (data) {
        var productDesc = document.getElementById('product-desc')
        productDesc.style.height = Math.ceil(data.length / (document.getElementById('productName').clientWidth / 14)) * 20 + 6 + 'px'
        productDesc.style.width = '100%'
        document.getElementById('more').style.display = 'none'
        document.getElementById('packUp').style.display = 'inline'
      },
      // 应用介绍->收起
      packUpProfile () {
        var productDesc = document.getElementById('product-desc')
        productDesc.style.height = '20px'
        productDesc.style.width = '550px'
        document.getElementById('more').style.display = 'inline'
        document.getElementById('packUp').style.display = 'none'
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
          document.getElementById('aliPay').style.border = '1px solid #f0f0f0'
          document.getElementById('aliPay').style.borderLeft = '0px solid #ffffff'
        } else {
          this.messageRemind('warning', '猿类努力开发中...')
//          document.getElementById(index).style.border = '1px solid #ff5f27'
//          document.getElementById('weChatPay').style.border = '1px solid #f0f0f0'
//          document.getElementById('weChatPay').style.borderRadius = '0px solid #ffffff'
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

  .tplDetail-head {
    font-size: 14px;
    min-height: 118px;
    border-bottom: 1px solid #f0f0f0;
    .tplDetail-head-left {
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
    .tplDetail-head-right {
      margin-top: 12px;
      padding-left: 132px;
      text-align: left;
      #more {
        float: right;
      }
      #product-desc {
        padding-top: 6px;
        height: 20px;
        width: 550px;
        overflow: hidden
      }
      #packUp {
        display: none;
      }
      .data-feesDesc {
        color: #505050;
        font-weight: bold;
        padding-top: 12px;
      }
    }
  }

  .tplDetail-middle {
    font-size: 14px;
    padding-top: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid #f0f0f0;
    .data-product {
      width: 220px;
      height: 102px;
      line-height: 102px;
      border: 1px solid #ff5f27;
      background-color: #ff5f27;
      font-size: 14px;
      .data-product-price {
        float: left;
        width: 163px;
        height: 102px;
        font-size: 24px;
        color: #ff5f27;
        background: #ffffff;
      }
      .data-product-card {
        float: right;
        background-color: #f0f0f0;
        width: 57px;
        height: 102px;
        border-bottom-right-radius: 25px;
      }
      .data-product-text {
        margin: 20px;
        width: 20px;
        height: 57px;
        line-height: 25px;
      }
    }
  }

  .tplDetail-bottom {
    text-align: left;
    padding-top: 24px;
    #weChatPay {
      height: 42px;
      line-height: 42px;
      border: 1px solid #ff5f27;
      display: inline-block;
      width: 49%;
    }
    #aliPay {
      height: 42px;
      line-height: 42px;
      display: inline-block;
      width: 49%;
      border-top: 1px solid #f0f0f0;
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #f0f0f0;
      float: right
    }
    .pay-image {
      width: 20px;
      height: 20px;
      padding-left: 18px;
      vertical-align: middle;
      margin-bottom: 3px;
    }
  }

  .confirm-order {
    margin-top: 6px;
    width: 107px;
    height: 30px;
    padding: 6px 15px 7px 15px;
  }

</style>
