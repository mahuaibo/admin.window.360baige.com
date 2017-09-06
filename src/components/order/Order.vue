<template>
  <div class="index" style="padding-right:20px;min-width: 1120px;">
    <div class="content-head">
      <!--状态 -1销毁 0 待付款 1待发货 2 待收货 3待评价 4完成 5退货/售后 -->
      <el-tabs v-model="orderListData.status" @tab-click="filterList">
        <el-tab-pane label="全部" name="-100"></el-tab-pane>
        <el-tab-pane label="待付款" name="0"></el-tab-pane>
        <el-tab-pane label="待发货" name="1"></el-tab-pane>
        <el-tab-pane label="待收货" name="2"></el-tab-pane>
        <el-tab-pane label="待评价" name="3"></el-tab-pane>
        <el-tab-pane label="完成" name="4"></el-tab-pane>
        <el-tab-pane label="退货/售后" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-list">
      <div class="content-list-headings">
        <div class="headings-item" style="padding-left:65px;">商品</div>
        <div class="headings-item" style="padding-left:190px;">单价 (￥)</div>
        <div class="headings-item" style="padding-left:96px;">数量</div>
        <div class="headings-item" style="padding-left:82px;">商品操作</div>
        <div class="headings-item" style="padding-left:75px;">实付款 (￥)</div>
        <div class="headings-item" style="padding-left:76px;">交易状态</div>
        <div class="headings-item" style="padding-left:118px;">交易操作</div>
      </div>
      <div class="content-list-data" style="overflow:overlay;">
        <div v-if="orderListData.total==0" style="font-size: 14px;text-align: center;color: #5e7382;">暂无数据</div>
        <div v-else style="height:164px;border: 1px solid #dae8f6;margin-bottom: 20px;"
             v-for="val in orderData.list">
          <div class="content-list-data-orderCode">
            <label style="margin-left: 20px;"> 订单号：{{ val.code }}</label>
          </div>
          <div class="content-list-datas" style="width: 1078px;height: 109px;">
            <div class="data-item content-list-data-merchandise">
              <img :src="val.image" style="height:70px;width:70px;padding-left: 20px;"/>
              <div class="commodity-name">{{ val.brief }}</div>
              <div class="classify" v-if="val.productType==0">分类：应用</div>
            </div>
            <div class="data-item content-list-data-price">{{ money(val.price) }} </div>
            <div class="data-item content-list-data-number">{{ val.num }}</div>
            <div class="data-item content-list-data-mOperation">申请售后</div>
            <div class="data-item content-list-data-realPay">{{ money(val.totalPrice) }} </div>
            <div class="data-item content-list-data-status">
              <div v-if="val.status===0">
                <label style="color: #505050;">待付款</label>
              </div>
              <div v-else-if="val.status===4">
                <label style="color: #505050;">交易完成</label>
              </div>
            </div>
            <div class="data-item content-list-data-tOperation">
              <div v-if="val.status===0">
                <button class="immediately-pay" @click="immediatelyPay(val)">立即支付</button>
                <el-button type="text" class="close-order" @click="closeOrder(val)">关闭订单</el-button>
              </div>
              <div v-else-if="val.status===4" style="width:97px;text-align:center;">
                <el-button type="text" class="order-desc" @click="orderDetail(val)">订单详情</el-button>
              </div>
              <!--<button class="appraise-button">评价</button>-->
              <!--<el-button type="text" class="again-buy">再次购买</el-button>-->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="refreshDataList" @current-change="refreshDataList"
                     :current-page.sync="orderListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="orderListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="orderListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    created () {
      this.publicParameters.returnButtom = false
      this.initOrderListData(this.orderListData)
    },
    computed: {
      ...mapGetters([
        'orderData',
        'publicParameters'
      ])
    },
    data () {
      return {
        orderListData: {
          status: '-100',
          pageSize: 50,
          current: 1,
          total: 0
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick',
        'initOrderListData'
      ]),
      money (amount) {
        if (amount === 0) {
          return '0.00'
        } else {
          return amount / 100
        }
      },
      filterList (val) {
        this.initOrderListData(this.orderListData)
      },
      // 关闭订单
      closeOrder (val) {
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/order/cancel',
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: val.id
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.messageRemind('success', response.data.message)
            current.initOrderListData(current.orderListData)
          } else {
            current.messageRemind('error', response.data.message)
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      // 立即支付
      immediatelyPay (val) {
        this.menuItemStyle()
        this.handleClick('/application/appTplDetail?i=' + val.productId + '&&oId=' + val.id)
      },
      // 订单详情
      orderDetail (val) {
        this.menuItemStyle()
        this.handleClick('/application/appTplDetail?i=' + val.productId + '&&oId=' + val.id)
      },
      menuItemStyle () {
        document.getElementById('center').style.borderRight = '8px solid #69df8a'
        document.getElementById('center').style.backgroundColor = '#4b5880'
        document.getElementById('orderList').style.borderRight = ''
        document.getElementById('orderList').style.backgroundColor = ''
      },
      refreshDataList () {
        this.initOrderListData(this.orderListData)
      },
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .content-head {
    padding: 12px 20px 32px 20px;
  }

  .content-list {
    min-width: 1118px;
    text-align: left;
    .content-list-headings {
      background-color: #F5F5F5;
      border: 1px solid #E6E6E6;
      font-size: 14px;
      color: #505050;
      margin: 0px 0px 32px 20px;
      width: 1078px;
      .headings-item {
        display: inline;
        height: 53px;
        line-height: 53px;
      }
    }
    .content-list-data {
      height: calc(100vh - 336px);
      overflow: scroll;
      padding-left: 20px;
      padding-right: 20px;
      .content-list-data-orderCode {
        height: 55px;
        line-height: 55px;
        background-color: #eef6fe;
        font-size: 14px;
        color: #505050;
      }
      .content-list-datas {
        .data-item {
          height: 90px;
          float: left;
          margin-top: 18px;
          font-size: 14px;
        }
        .content-list-data-merchandise {
          width: 295px;
          .commodity-name {
            position: relative;
            top: -74px;
            left: 108px;
            color: #505050;
          }
          .classify {
            position: relative;
            left: 108px;
            top: -62px;
            color: #808080;
          }
        }
        .content-list-data-price {
          width: 140px;
        }
        .content-list-data-number {
          width: 112px;
        }
        .content-list-data-mOperation {
          width: 128px;
        }
        .content-list-data-realPay {
          width: 130px;
        }
        .content-list-data-status {
          width: 158px;
          text-align: left;
        }
        .content-list-data-tOperation {
          width: 98px;
          .immediately-pay {
            font-weight: bold;
            width: 97px;
            height: 30px;
            color: #ffffff;
            background-color: #ff5f27;
            border: 1px solid #ff5f27;
            outline: none;
            border-radius: 3px;
          }
          .immediately-pay:hover {
            background-color: #ff6c39;
          }
          .close-order {
            width: 97px;
            margin-top: 14px;
            color: #505050;
            padding: 0px;
          }
          .close-order:hover {
            color: #20a0ff;
          }
          .order-desc {
            padding: 0px;
            color: #505050;
          }
          .order-desc:hover {
            color: #20a0ff;
          }
          /*.appraise-button {*/
          /*outline: none;*/
          /*cursor: pointer;*/
          /*width: 68px;*/
          /*height: 30px;*/
          /*background-color: #ffffff;*/
          /*border-radius: 3px;*/
          /*border: 1px solid #cadced;*/
          /*}*/
          /*.appraise-button:hover {*/
          /*color: #20a0ff;*/
          /*border: 1px solid #20a0ff;*/
          /*}*/
        }
      }
    }
  }

  .comtent-paging {
    float: right;
    margin-right: 20px;
    padding: 22px 0px 0px 0px;
  }
</style>
