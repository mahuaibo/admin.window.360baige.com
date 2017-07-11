<template>
  <div class="index">
    <div class="content-head">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部" name="first"></el-tab-pane>
        <el-tab-pane label="待付款" name="second"></el-tab-pane>
        <el-tab-pane label="待发货" name="third"></el-tab-pane>
        <el-tab-pane label="待收货" name="fourth"></el-tab-pane>
        <el-tab-pane label="待评价" name="fourth"></el-tab-pane>
        <el-tab-pane label="退货/售后" name="fourth"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="comtent-list">
      <el-table :data="orderData.list" border style="width: 100%">
        <el-table-column label="订单号" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.orderNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" width="200">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="价格" width="140">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量" width="100">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="orderDetailModel=true">详情</el-button>
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">联系客服</el-button>
            <el-button size="small" @click="handleDelete(scope.$index, scope.row)">取消订单</el-button>
            <el-button size="small" type="warning" @click="handleDelete(scope.$index, scope.row)">付款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]"
                     :page-size="100" layout="sizes, prev, pager, next" :total="1000">
      </el-pagination>
      <el-dialog title="订单详情" :visible.sync="orderDetailModel" size="tiny" :before-close="cancel">
        <el-form ref="form" :model="orderDetail" label-width="90px">
          <el-form-item label="收货人：">{{ orderDetail.name }}</el-form-item>
          <el-form-item label="电话号码：">{{ orderDetail.phone }}</el-form-item>
          <el-form-item label="收货地址：">{{ orderDetail.address }}</el-form-item>
          <el-form-item label="订单号：">{{ orderDetail.orderNum }}</el-form-item>
          <el-form-item label="商品名称：">{{ orderDetail.goodsName }}</el-form-item>
          <el-form-item label="单价：">{{ orderDetail.price }}</el-form-item>
          <el-form-item label="数量：">{{ orderDetail.number }}</el-form-item>
          <el-form-item label="商品总价：">{{ orderDetail.totalPrice }}</el-form-item>
          <el-form-item label="实付款：">{{ orderDetail.payment }}</el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="物流信息" :visible.sync="logisticsModel" size="tiny" :before-close="cancel">
        <el-steps :space="100" direction="vertical" :active="1">
          <el-step title="快件到达：北京市海淀区分拣中心"></el-step>
        </el-steps>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'orderData'
      ])
    },
    data () {
      return {
        orderDetailModel: false,
        logisticsModel: false,
        orderDetail: {},
        currentPage: 2,
        activeName: 'first'
      }
    },
    methods: {
      ...mapActions([
        'increment',
        'decrement',
        'handleClick',
        'handleDetail',
        'handleEdit',
        'handleDelete',
        'handleSelectionChange',
        'handleSizeChange',
        'handleCurrentChange'
      ]),
      handleIconClick (ev) {
        console.log(ev)
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      cancel () {
        this.orderDetailModel = false
        this.logisticsModel = false
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
