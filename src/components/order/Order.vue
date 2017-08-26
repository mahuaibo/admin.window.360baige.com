<template>
  <div class="index" style="min-width: 1120px;">
    <div class="content-head">
      <!--0:撤回 1：待审核  2：已通过 3：未通过 4：发货中 5：完成-->
      <el-tabs v-model="orderListData.status" @tab-click="filterList">
        <el-tab-pane label="全部" name="-1"></el-tab-pane>
        <el-tab-pane label="撤回" name="0"></el-tab-pane>
        <el-tab-pane label="待审核" name="1"></el-tab-pane>
        <el-tab-pane label="已通过" name="2"></el-tab-pane>
        <el-tab-pane label="未通过" name="3"></el-tab-pane>
        <el-tab-pane label="发货中" name="4"></el-tab-pane>
        <el-tab-pane label="交易完成" name="5"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="content-list">
      <div class="content-list-headings">
        <div style="background-color: #F5F5F5;coloe:#505050;border: 1px solid #E6E6E6;">
          <div class="headings-item" style="padding-left:65px;">商品</div>
          <div class="headings-item" style="padding-left:210px;">单价</div>
          <div class="headings-item" style="padding-left:96px;">数量</div>
          <div class="headings-item" style="padding-left:82px;">商品操作</div>
          <div class="headings-item" style="padding-left:75px;">实付款</div>
          <div class="headings-item" style="padding-left:76px;">交易状态</div>
          <div class="headings-item" style="padding-left:118px;">交易操作</div>
        </div>
      </div>
      <div class="content-list-data">
        <div style="height:164px;border: 1px solid #dae8f6;margin-bottom: 20px;" v-for="val in orderData.list">
          <div class="content-list-data-orderCode">
            <label style="margin-left: 20px;"> 订单号：20170828979</label>
          </div>
          <div class="content-list-datas" style="height: 109px;">
            <div class="data-item content-list-data-merchandise">
              <img src="../../assets/logo.png" style="height:70px;width:70px;padding-left: 20px;"/>
              <label style="position:relative;bottom: 54px;left: 18px;color:#505050;">安全中心</label>
              <label style="position:relative;left: -42px;bottom: 26px;color:#808080;">分类：10000$/天</label>
            </div>
            <div class="data-item content-list-data-price">
              <div>72.00 元</div>
            </div>
            <div class="data-item content-list-data-number">
              <div>2 个</div>
            </div>
            <div class="data-item content-list-data-mOperation">
              <div>申请售后</div>
            </div>
            <div class="data-item content-list-data-realPay">
              <div>72.00 元</div>
            </div>
            <div class="data-item content-list-data-status">
              <div>交易成功</div>
              <el-button type="text" style="padding-top: 12px;color: #505050;">订单详情</el-button>
            </div>
            <div class="data-item content-list-data-tOperation">
              <button style="width:68px;height:30px;background-color:#ffffff;border-radius:3px;border:1px solid #cadced;">
                <b>评价</b>
              </button>
              <el-button type="text" style="margin:14px 0px 0px 8px;color: #505050;padding: 0px;">再次购买</el-button>
            </div>
          </div>
        </div>
      </div>
      <!--<el-table :data="orderData.list">-->
      <!--<el-table-column label="订单号" width="180">-->
      <!--<template scope="scope">-->
      <!--<span style="margin-left: 10px">{{ scope.row.code }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="价格" width="180">-->
      <!--<template scope="scope">-->
      <!--<span style="margin-left: 10px">{{ scope.row.price }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="支付方式" width="180">-->
      <!--<template scope="scope">-->
      <!--<span style="margin-left: 10px">{{ scope.row.pay_type }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="状态" width="180">-->
      <!--<template scope="scope">-->
      <!--<span style="margin-left: 10px">{{ scope.row.status }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作">-->
      <!--<template scope="scope">-->
      <!--<el-button size="small" @click="orderDetail(scope.row)">详情</el-button>-->
      <!--<el-button size="small" type="danger" @click="cancelOrder(scope.row)">取消订单</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
      <!--</el-table>-->
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="orderListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="orderListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="orderListData.total">
      </el-pagination>
    </div>
    <el-dialog title="订单详情" :visible.sync="orderDetailModel" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="orderDetailData" label-width="90px">
        <el-form-item label="交易时间：">{{ orderDetailData.createTime }}</el-form-item>
        <el-form-item label="订单号码：">{{ orderDetailData.code }}</el-form-item>
        <el-form-item label="价格：">{{ orderDetailData.price }}</el-form-item>
        <el-form-item label="支付方式：">{{ orderDetailData.payType }}</el-form-item>
        <el-form-item label="详情：">{{ orderDetailData.brief }}</el-form-item>
        <el-form-item label="状态：">{{ orderDetailData.status }}</el-form-item>
      </el-form>
    </el-dialog>
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
        orderDetailModel: false,
        orderDetailData: {
          createTime: null,
          code: null,
          price: null,
          payType: null,
          brief: null,
          status: null
        },
        orderListData: {
          status: '-1',
          pageSize: 50,
          current: 1,
          total: 1
        }
      }
    },
    methods: {
      ...mapActions([
        'initOrderListData'
      ]),
      filterList (val) {
        this.initOrderListData(this.orderListData)
      },
      orderDetail (val) { // 订单详情
        var current = this
        axios({
          method: 'GET',
          url: this.publicParameters.domain + '/order/detail',
          params: {
            access_token: localStorage.getItem('accessToken'),
            id: val.id
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.orderDetailData.createTime = response.data.data.create_time
            current.orderDetailData.code = response.data.data.code
            current.orderDetailData.price = response.data.data.price
            current.orderDetailData.payType = response.data.data.pay_type
            current.orderDetailData.brief = response.data.data.brief
            current.orderDetailData.status = response.data.data.status
          } else {
            current.messageRemind('error', '失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.orderDetailModel = true
      },
      cancelOrder (val) { // 取消订单
        console.log(val.id)
      },
      handleSizeChange (val) {
        this.initOrderListData(this.orderListData)
      },
      handleCurrentChange (val) {
        this.initOrderListData(this.orderListData)
      },
      cancel () {
        this.orderDetailModel = false
      },
      messageRemind  (type, info) { // type success成功   warning警告   error失败
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
    text-align: left;
    height: calc(100vh - 262px);
    overflow: scroll;
    .content-list-headings {
      padding: 0px 20px 18px 20px;
      font-size: 14px;
      color: #505050;
      .headings-item {
        display: inline;
        height: 53px;
        line-height: 53px;
      }
    }
    .content-list-data {
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
        }
        .content-list-data-tOperation {
          width: 85px;
        }
      }
    }
  }

  .comtent-paging {
    float: right;
    margin-right: 20px;
    padding: 30px 0px 0px 0px;
  }
</style>
