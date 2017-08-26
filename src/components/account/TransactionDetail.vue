<template>
  <div class="index">
    <div class="transaction-content-head">
      <div class="transaction-content-head-seek">
        <el-date-picker v-model="detailListData.startTime" :editable="false" placeholder="请选择开始日期"
                        :picker-options="pickerOptions" style="margin-right: 10px;width: 252px;">
        </el-date-picker>
        <label style="color:#cadced;">—</label>
        <el-date-picker v-model="detailListData.endTime" :editable="false" placeholder="请选择结束日期"
                        :picker-options="pickerOptions" style="margin-left: 10px;margin-right:50px;width: 252px;">
        </el-date-picker>
        <el-button type="primary" @click="search" style="width: 100px;">搜索</el-button>
      </div>
    </div>
    <div class="transaction-comtent-list">
      <el-table :data="transactionDetailData.list" style="width: 100%">
        <el-table-column label="日期" width="160">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" width="120">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount_type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" width="160">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" width="160">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="transaction-comtent-paging" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="detailListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="detailListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="detailListData.total">
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="transactionDetailModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="transactionForm" label-width="90px">
        <el-form-item label="日期：">{{ transactionForm.createTime }}</el-form-item>
        <el-form-item label="交易类型：">{{ transactionForm.amountType }}</el-form-item>
        <el-form-item label="交易金额：">{{ transactionForm.amount }}</el-form-item>
        <el-form-item label="余额：">{{ transactionForm.balance }}</el-form-item>
        <el-form-item label="订单号：">{{ transactionForm.orderCode }}</el-form-item>
        <el-form-item label="备注：">{{ transactionForm.remark }}</el-form-item>
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
      return {
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        detailListData: {
          startTime: '',
          endTime: '',
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
      handleDetail (row) {
        var current = this
        axios({
          method: 'GET',
          url: this.publicParameters.domain + '/account_item/detail',
          params: {
            access_token: localStorage.getItem('accessToken'),
            id: row.id
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.transactionForm.createTime = response.data.data.create_time
            current.transactionForm.orderCode = response.data.data.order_code
            current.transactionForm.amountType = response.data.data.amount_type
            current.transactionForm.amount = response.data.data.amount
            current.transactionForm.remark = response.data.data.remark
          } else {
            current.messageRemind('error', '失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.transactionDetailModal = true
      },
      handleSizeChange (val) {
        this.initTransactionDetailListData(this.detailListData)
      },
      handleCurrentChange (val) {
        this.initTransactionDetailListData(this.detailListData)
      },
      search () {
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
    height: calc(100vh - 180px);
    overflow: scroll;
  }

  .transaction-comtent-paging {
    float: right;
    right: 40px;
    padding: 30px 0px 0px 0px;
  }
</style>
