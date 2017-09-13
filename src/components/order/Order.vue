<template>
  <div class="order">
    <div class="order-tab">
      <!--状态 -1销毁 0待付款 1待发货 2待收货 3待评价 4完成 5退货/售后 -->
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
    <div class="order-main">
      <div class="order-main-title">
        <div class="order-main-title-item">商品</div>
        <div class="order-main-title-item">单价 (￥)</div>
        <div class="order-main-title-item">数量</div>
        <div class="order-main-title-item">实付款 (￥)</div>
        <div class="order-main-title-item">交易状态</div>
        <div class="order-main-title-item">交易操作</div>
      </div>
      <div class="order-main-content">
        <div class="order-main-content-empty" v-if="orderListData.total===0">
          暂无数据

        </div>
        <div class="order-main-content-list" v-else>
          <div class="order-main-content-list-item" v-for="val in orderData.list">
            <div class="order-main-content-list-item-title">
              订单号：{{ val.code }}

            </div>
            <div class="order-main-content-list-item-table">
              <div class="order-main-content-list-item-table-item">
                <div class="photo">
                  <img width="100%" height="100%" :src="val.image"/>
                </div>
                <div class="title">{{ val.brief }}</div>
                <div class="classify" v-if="val.productType==0">分类: 应用</div>
              </div>
              <div class="order-main-content-list-item-table-item">
                <div class="text">{{ money(val.price) }}</div>
              </div>
              <div class="order-main-content-list-item-table-item">
                <div class="text">{{ money(val.num) }}</div>
              </div>
              <div class="order-main-content-list-item-table-item">
                <div class="text">{{ money(val.totalPrice) }}</div>
              </div>
              <div class="order-main-content-list-item-table-item">
                <div v-if="val.status===0" class="text">待付款</div>
                <div v-else-if="val.status===4" class="text">交易完成</div>
              </div>
              <div class="order-main-content-list-item-table-item">
                <div v-if="val.status===0" class="text2">
                  <button v-if="shixiao(val.createTime)" class="immediately-pay" @click="closeOrder(val)">
                    订单超时

                  </button>
                  <button v-else class="immediately-pay" @click="immediatelyPay(val)">立即支付</button>
                  <div>
                    <el-button type="text" class="close-order" @click="closeOrder(val)">关闭订单</el-button>
                  </div>
                </div>
                <div v-else-if="val.status===4" class="text">
                  <el-button type="text" class="order-desc" @click="orderDetail(val)">订单详情</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="order-page">
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
  import {mapGetters, mapActions} from 'vuex'
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
      shixiao (time) {
        var toDay = new Date()
        var toTime = toDay.getTime()
        if (toTime - time > 7200000) {
          return true
        } else {
          return false
        }
      },
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
        this.$confirm('确认关闭订单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        }).catch(() => {
          console.log('取消操作！')
        })
      },
      // 立即支付
      immediatelyPay (val) {
        this.menuItemStyle()
        this.handleClick('/application/appTplDetail?i=' + val.productId + '&oId=' + val.id)
      },
      // 订单详情
      orderDetail (val) {
        this.menuItemStyle()
        this.handleClick('/application/appTplDetail?i=' + val.productId + '&oId=' + val.id)
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
  $min-width-order: 664px;
  $min-width-order-list: 679px;
  .order {
    .order-tab {
      min-width: $min-width-order !important;
      padding: 12px 20px 32px 20px;
    }
    .order-main {
      min-width: $min-width-order !important;
      padding: 0 20px;
      text-align: left;
      .order-main-title {
        background: #F5F5F5;
        border: 1px solid #E6E6E6;
        font-size: 14px;
        color: #505050;
        margin-bottom: 20px;
        min-width: $min-width-order !important;
        width: calc(100vw - 360px);
        .order-main-title-item {
          display: inline-block;
          min-width: 100px;
          width: 16%;
          height: 53px;
          line-height: 53px;
          text-align: center !important;
        }
      }
      .order-main-content {
        min-width: $min-width-order !important;
        width: calc(100vw - 360px) !important;
        overflow: hidden;
        .order-main-content-empty {
          height: 80px !important;
          line-height: 80px;
          font-size: 14px;
          text-align: center;
          color: #5e7382;
        }
        .order-main-content-list {
          min-width: $min-width-order-list !important;
          width: calc(100vw - 345px) !important;
          overflow-y: visible;
          overflow-x: hidden;
          height: calc(100vh - 336px) !important;
          .order-main-content-list-item {
            min-width: $min-width-order !important;
            width: calc(100vw - 360px) !important;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            height: 164px;
            border: 1px solid #dae8f6;
            margin-bottom: 20px;
            .order-main-content-list-item-title {
              min-width: $min-width-order !important;
              padding: 0 20px;
              height: 55px;
              line-height: 55px;
              background: #eef6fe;
              font-size: 14px;
              color: #505050;
            }
            .order-main-content-list-item-table {
              min-width: $min-width-order !important;
              height: 110px;
              .order-main-content-list-item-table-item {
                display: inline-table;
                min-width: 100px;
                width: 16%;
                height: 110px;
                text-align: center;
                float: left;
                font-size: 14px;
                .text {
                  color: #505050;
                  line-height: 110px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .text2 {
                  margin-top: 20px;
                }
                .photo {
                  position: relative;
                  top: 20px;
                  left: 20px;
                  width: 70px;
                  height: 70px;
                }
                .title {
                  width: 160px;
                  position: relative;
                  top: -40px;
                  left: 100px;
                  color: #505050;
                  text-align: left;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .classify {
                  width: 160px;
                  position: relative;
                  top: -30px;
                  left: 100px;
                  color: #505050;
                  text-align: left;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
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
                  margin-top: 10px;
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
              }
            }
          }
        }
      }
    }

    .order-page {
      min-width: $min-width-order !important;
      text-align: right;
      padding: 20px 20px 0px 20px;
    }
  }
</style>
