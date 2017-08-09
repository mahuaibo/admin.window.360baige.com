<template>
  <div class="index">
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
    <div class="comtent-list">
      <el-table :data="orderData.list" border>
        <el-table-column label="订单号" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.code }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付方式" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pay_type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="orderDetail(scope.row)">详情</el-button>
            <el-button size="small" type="danger" @click="cancelOrder(scope.row)">取消订单</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="orderListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="orderListData.pageSize" layout="sizes, prev, pager, next" :total="orderListData.total">
      </el-pagination>
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
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initOrderListData(this.orderListData)
      this.defaultActive.index = '/order/list'
    },
    computed: {
      ...mapGetters([
        'orderData',
        'defaultActive'
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
          url: 'http://localhost:30000/cloud/window/v1/order/detail',
          params: {
            access_token: localStorage.getItem('positionAccessToken'),
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
<style>
  .content-head {
    padding-bottom: 10px;
  }

  .content-head-seek {
    width: 200px;
    position: absolute;
    left: 21px;
  }

  .content-head-shop {
    position: absolute;
    right: 21px;
  }

  .comtent-paging {
    padding-top: 20px;
  }
</style>
