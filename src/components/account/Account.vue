<template>
  <div class="index">
    <div class="content-head">
      <el-row :gutter="24" style="padding-bottom: 20px;">
        <el-col :span="6">
          <div class="bg-purple">账户余额(￥)：{{ statistical.balance }}</div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">总入账(￥)：{{ statistical.TotalEntry }}</div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">总出账(￥)：{{ statistical.TotalDischarge }}</div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <el-button type="text">
              <el-button type="text" @click="handleClick('/transactionDetail')">查看交易明细>></el-button>
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="11">
        <el-col :span="7">
          <div class="bg-purple">本月账单：存入(￥)：{{ statistical.MonthIncome}}</div>
        </el-col>
        <el-col :span="4">
          <div class="bg-purple">支出(￥)：{{ statistical.MonthPay }}</div>
        </el-col>
      </el-row>
    </div>
    <div class="comtent-list">
      <el-table :data="accountData.list" border style="width: 100%">
        <el-table-column label="日期" width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.dealType }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" initApplicationTplDatawidth="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="accountListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="accountListData.pageSize" layout="sizes, prev, pager, next"
                     :total="accountListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initAccountData(this.statistical)
      this.initAccountListData(this.accountListData)
    },
    computed: {
      ...mapGetters([
        'accountData'
      ])
    },
    data () {
      return {
        statistical: {
          balance: null,          // 余额
          TotalEntry: null,       // 总入账
          TotalDischarge: null,   // 总出账
          MonthIncome: null,      // 月收入
          MonthPay: null          // 月支出
        },
        accountListData: {
          pageSize: 50,
          current: 1,
          total: 0
        }
      }
    },
    methods: {
      ...mapActions([
        'initAccountData',
        'initAccountListData',
        'handleClick'
      ]),
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
      }
    }
  }
</script>
<style>

  .comtent-paging {
    padding-top: 20px;
  }

  .content-head {
    padding-bottom: 20px;
  }

  .bg-purple {
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    text-align: center
  }
</style>
