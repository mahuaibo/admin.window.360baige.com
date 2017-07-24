<template>
  <div class="index">
    <div class="content-head">
      <div class="content-head-seek">
        <el-date-picker v-model="detailListData.startTime" align="right" type="date" placeholder="请选择开始日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
        <el-date-picker v-model="detailListData.endTime" align="right" type="date" placeholder="请选择结束日期"
                        :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary">搜索</el-button>
      </div>
    </div>
    <div class="comtent-list">
      <el-table :data="transactionDetailData.list" border style="width: 100%">
        <el-table-column label="日期" width="160">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="120">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" width="120">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.dealType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" width="160">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="余额" width="160">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.balance }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="transactionDetailModal=true">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="detailListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="detailListData.pageSize" layout="sizes, prev, pager, next"
                     :total="detailListData.total">
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="transactionDetailModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="transactionForm" label-width="90px">
        <el-form-item label="日期：">{{ transactionForm.date }}</el-form-item>
        <el-form-item label="类型：">{{ transactionForm.type }}</el-form-item>
        <el-form-item label="支出/存入：">{{ transactionForm.payType }}</el-form-item>
        <el-form-item label="余额：">{{ transactionForm.balance }}</el-form-item>
        <el-form-item label="订单号：">{{ transactionForm.orderNum }}</el-form-item>
        <el-form-item label="备注：">{{ transactionForm.remark }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initTransactionDetailListData(this.detailListData)
    },
    computed: {
      ...mapGetters([
        'transactionDetailData'
      ])
    },
    data () {
      return {
        pickerOptions: {
          disabledDate (time) {
            return time.getTime() < Date.now() - 8.64e7
          }
        },
        detailListData: {
          startTime: '',
          endTime: '',
          pageSize: 50,
          current: 1,
          total: 0
        },
        transactionDetailModal: false,
        transactionForm: {
          date: '2017.10.10',
          type: '现金支出',
          payType: '152.00',
          balance: null,
          orderNum: null,
          remark: '存入',
          page: 1,
          rows: 1
        }
      }
    },
    methods: {
      ...mapActions([
        'initTransactionDetailListData'
      ]),
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      cancel () { // 点击取消清空表单
        this.transactionDetailModal = false
      }
    }
  }
</script>
<style>

  .content-head {
    padding-bottom: 50px;
  }

  .content-head-seek {
    position: absolute;
    left: 21px;
  }

  .comtent-paging {
    padding-top: 20px;
  }
</style>
