<template>
  <div class="index">
    <div class="Transaction-head">
      <el-date-picker v-model="detailListData.startTime" placeholder="请选择开始日期" class="Transaction-head-startTime">
      </el-date-picker>
      <label class="Transaction-head-midline">—</label>
      <el-date-picker v-model="detailListData.endTime" placeholder="请选择结束日期" class="Transaction-head-endTime">
      </el-date-picker>
      <el-button type="primary" @click="TransactionRefreshListData" class="Transaction-head-button">搜索</el-button>
    </div>
    <div class="Transaction-list">
      <el-table :data="transactionDetailData.list" max-height="510">
        <el-table-column label="交易时间">
          <template scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额(￥)">
          <template scope="scope">
            <span v-if="scope.row.amount>=0" class="Transaction-list-topUp">+{{ money(scope.row.amount) }} (充值)</span>
            <span v-else-if="scope.row.amount<0" class="Transaction-list-consume">{{ money(scope.row.amount)
              }} (消费)</span>
          </template>
        </el-table-column>
        <el-table-column label="账户余额(￥)">
          <template scope="scope">
            <span class="Transaction-list-balance">{{ money(scope.row.balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="Transaction-paging">
      <el-pagination @size-change="TransactionRefreshListData" @current-change="TransactionRefreshListData" :page-sizes="[50, 100, 200]"
                     :current-page.sync="detailListData.current" :page-size="detailListData.pageSize"
                     layout="total, sizes, prev, pager, next, jumper" :total="detailListData.total">
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="transactionDetailModal" size="tiny" :before-close="cancel"
               :close-on-click-modal="false">
      <el-form ref="form" :model="transactionForm" label-width="100px" class="Transaction-detail-from">
        <el-form-item label="交易日期：">{{ transactionForm.createTime }}</el-form-item>
        <el-form-item label="交易金额：">
          <span v-if="transactionForm.amount>=0" class="Transaction-detail-from-touUp">
            <span>+{{ money(transactionForm.amount) }} (充值)</span>
          </span>
          <span v-else-if="transactionForm.amount<0" class="Transaction-detail-from-consume">
            <span>{{ money(transactionForm.amount) }} (消费)</span>
          </span>
        </el-form-item>
        <el-form-item class="Transaction-detail-from-balance" label="账户余额：">
          <span>{{ money(transactionForm.balance) }}</span>
        </el-form-item>
        <el-form-item label="描　　述：">{{ transactionForm.remark }}</el-form-item>
        <el-form-item label="订 单 号 ：">{{ transactionForm.orderCode }} 查看</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.publicParameters.returnButtom = true
      this.publicParameters.path = '/account/list'
      this.initTransactionDetailListData(this.detailListData)
    },
    computed: {
      ...mapGetters([
        'transactionDetailData',
        'publicParameters'
      ])
    },
    data () {
      var now = new Date()  // 当前日期
      function getMonthStartDate() { // 获得本月的开始日期
        var monthStartDate = new Date(now.getFullYear(), now.getMonth(), 1)
        return formatDate(monthStartDate)
      }

      function getMonthEndDate() { // 获得本月的结束日期
        var monthEndDate = new Date()
        return formatDate(monthEndDate)
      }

      function formatDate(date) { // 格式化时间
        var myyear = date.getFullYear()
        var mymonth = date.getMonth() + 1
        var myweekday = date.getDate() + 1
        if (mymonth < 10) {
          mymonth = '0' + mymonth
        }
        if (myweekday < 10) {
          myweekday = '0' + myweekday
        }
        return (myyear + '-' + mymonth + '-' + myweekday)
      }

      return {
        detailListData: {
          startTime: getMonthStartDate(),
          endTime: getMonthEndDate(),
          pageSize: 50,
          current: 1,
          total: 1
        },
        transactionForm: {
          createTime: null,
          amount: null,
          amountType: null,
          balance: null,
          orderCode: null,
          remark: null
        },
        transactionDetailModal: false
      }
    },
    methods: {
      ...mapActions([
        'initTransactionDetailListData'
      ]),
      money (amount) {
        if (amount === 0) {
          return '0.00'
        } else {
          return amount / 100
        }
      },
      handleDetail (row) {
        var transactionDetailModal = true
        var current = this
        axios({
          method: 'POST',
          url: this.publicParameters.domain + '/accountItem/detail',
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: row.id
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.transactionForm = response.data.data
          } else {
            current.messageRemind('error', '详情获取失败！')
            transactionDetailModal = false
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.transactionDetailModal = transactionDetailModal
      },
      TransactionRefreshListData () {
        this.initTransactionDetailListData(this.detailListData)
      },
      cancel () { // 点击取消清空表单
        this.transactionDetailModal = false
      }
    }
  }
</script>
<style lang="scss" scoped>

  .Transaction-head {
    text-align: left;
    margin-top: 12px;
    line-height: 36px;
    padding: 0px 20px 32px 20px;
    .Transaction-head-startTime {
      margin-right: 10px;
      width: 252px;
    }
    .Transaction-head-midline {
      color: #cadced;
    }
    .Transaction-head-endTime {
      margin-left: 10px;
      margin-right: 50px;
      width: 252px;
    }
    .Transaction-head-button {
      width: 100px;
    }
  }

  .Transaction-list {
    padding-left: 20px;
    padding-right: 20px;
    .Transaction-list-topUp {
      color: #0BB20C;
    }
    .Transaction-list-consume {
      color: red;
    }
    .Transaction-list-balance {
      color: #20a0ff;
    }
  }

  .Transaction-paging {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }

  .Transaction-detail-from {
    text-align: left;
    padding-right: 10px;
    .Transaction-detail-from-touUp {
      color: #0BB20C;
    }
    .Transaction-detail-from-consume {
      color: red;
    }
    .Transaction-detail-from-balance {
      color: #20a0ff;
    }
  }
</style>
