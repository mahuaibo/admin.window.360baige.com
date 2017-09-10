<template>
  <div class="index">
    <div class="transaction-content-head">
      <div class="transaction-content-head-seek">
        <el-date-picker v-model="detailListData.startTime" placeholder="请选择开始日期"
                        style="margin-right: 10px;width: 252px;">
        </el-date-picker>
        <label style="color:#cadced;">—</label>
        <el-date-picker v-model="detailListData.endTime" placeholder="请选择结束日期"
                        style="margin-left: 10px;margin-right:50px;width: 252px;">
        </el-date-picker>
        <el-button type="primary" @click="refreshData" style="width: 100px;">搜索</el-button>
      </div>
    </div>
    <div class="transaction-comtent-list" max-height="510">
      <el-table :data="transactionDetailData.list" style="width: 100%">
        <el-table-column label="交易时间" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额(￥)" width="160">
          <template scope="scope">
            <span v-if="scope.row.amount>=0" style="margin-left: 10px;color: #0BB20C;">+{{ money(scope.row.amount)
              }} (充值)</span>
            <span v-else-if="scope.row.amount<0" style="margin-left: 10px;color: red;">{{ money(scope.row.amount)
              }} (消费)</span>
          </template>
        </el-table-column>
        <el-table-column label="账户余额(￥)" width="160">
          <template scope="scope">
            <span style="margin-left: 10px;color: #20a0ff;">{{ money(scope.row.balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="transaction-comtent-paging">
      <el-pagination @size-change="refreshData" @current-change="refreshData"
                     :current-page.sync="detailListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="detailListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="detailListData.total">
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="transactionDetailModal" size="tiny" :before-close="cancel" :close-on-click-modal="false">
      <el-form ref="form" :model="transactionForm" label-width="100px" style="text-align:left;padding-right:10px;">
        <el-form-item label="交易日期：">{{ transactionForm.createTime }}</el-form-item>
        <el-form-item label="交易金额：">
          <span v-if="transactionForm.amount>=0"
                style="margin-left: 10px;color: #0BB20C;">+{{ money(transactionForm.amount) }} (充值)</span>
          <span v-else-if="transactionForm.amount<0"
                style="margin-left: 10px;color: red;">{{ money(transactionForm.amount) }} (消费)</span>
        </el-form-item>
        <el-form-item style="color: #20a0ff;" label="账户余额：">{{ money(transactionForm.balance) }}</el-form-item>
        <el-form-item label="描　　述：">{{ transactionForm.remark }}</el-form-item>
        <el-form-item label="订 单 号 ：">{{ transactionForm.orderCode }} 查看</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

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
      // 获得本月的开始日期
      function getMonthStartDate () {
        var monthStartDate = new Date(now.getFullYear(), now.getMonth(), 1)
        return formatDate(monthStartDate)
      }

      // 获得本月的结束日期
      function getMonthEndDate () {
        var monthEndDate = new Date()
        return formatDate(monthEndDate)
      }

      function formatDate (date) {
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
        transactionDetailModal: false,
        transactionForm: {
          createTime: null,
          amount: null,
          amountType: null,
          balance: null,
          orderCode: null,
          remark: null
        }
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
            current.transactionForm.createTime = response.data.data.createTime
            current.transactionForm.orderCode = response.data.data.orderCode
            current.transactionForm.amountType = response.data.data.amountType
            current.transactionForm.amount = response.data.data.amount
            current.transactionForm.balance = response.data.data.balance
            current.transactionForm.remark = response.data.data.remark
          } else {
            current.messageRemind('error', '详情获取失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.transactionDetailModal = true
      },
      refreshData () {
        this.initTransactionDetailListData(this.detailListData)
      },
      cancel () { // 点击取消清空表单
        this.transactionDetailModal = false
      }
    }
  }
</script>
<style lang="scss" scoped>

  .transaction-content-head {
    margin-top: 12px;
    padding: 0px 20px 32px 20px;
    height: 36px;
    .transaction-content-head-seek {
      position: absolute;
    }
  }

  .transaction-comtent-list {
    padding-left: 20px;
    padding-right: 20px;
    /*height: calc(100vh - 180px);*/
    /*overflow: scroll;*/
  }

  .transaction-comtent-paging {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }
</style>
