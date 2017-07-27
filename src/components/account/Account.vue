<template>
  <div class="index">
    <div class="account-content-head">
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
              <el-button type="text" @click="handleClick('/account/transactionDetail')">查看交易明细>></el-button>
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
    <div class="account-comtent-list">
      <el-table :data="accountData.list" border style="width: 100%">
        <el-table-column label="日期" width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount_type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="金额" initApplicationTplDatawidth="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="handleDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="account-comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="accountListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="accountListData.pageSize" layout="sizes, prev, pager, next"
                     :total="accountListData.total">
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="accountDetailModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="accountFrom" label-width="90px">
        <el-form-item label="交易时间：">{{ accountFrom.createTime }}</el-form-item>
        <el-form-item label="订单号：">{{ accountFrom.orderCode }}</el-form-item>
        <el-form-item label="交易类型：">{{ accountFrom.amountType }}</el-form-item>
        <el-form-item label="交易金额：">{{ accountFrom.amount }}</el-form-item>
        <el-form-item label="备注：">{{ accountFrom.remark }}</el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initAccountData(this.statistical)
      this.initAccountListData(this.accountListData)
      this.defaultActive.index = '/account/list'
    },
    computed: {
      ...mapGetters([
        'accountData',
        'defaultActive'
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
          total: 1
        },
        accountDetailModal: false,
        accountFrom: {
          createTime: null, // 创建时间
          orderCode: null,  // 订单编码
          amountType: null, // 交易金额类型
          amount: null,      // 交易金额
          remark: null,      // 备注
          balance: null,     // 平账
          to_account: null   // 收款人公司
        }
      }
    },
    methods: {
      ...mapActions([
        'initAccountData',
        'initAccountListData',
        'handleClick'
      ]),
      handleDetail (row) {
        var current = this
        axios({
          method: 'GET',
          url: 'http://localhost:30000/cloud/window/v1/account_item/detail',
          params: {
            access_token: localStorage.getItem('positionAccessToken'),
            id: row.id
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.accountFrom.createTime = response.data.data.create_time
            current.accountFrom.orderCode = response.data.data.order_code
            current.accountFrom.amountType = response.data.data.amount_type
            current.accountFrom.amount = response.data.data.amount
            current.accountFrom.remark = response.data.data.remark
          } else {
            current.messageRemind('error', '失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.accountDetailModal = true
      },
      handleSizeChange () {
        this.initAccountListData(this.accountListData)
      },
      handleCurrentChange () {
        this.initAccountListData(this.accountListData)
      },
      messageRemind  (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      },
      cancel () { // 点击取消清空表单
        this.accountDetailModal = false
      }
    }
  }
</script>
<style>

  .account-comtent-paging {
    padding-top: 20px;
  }

  .account-content-head {
    padding-bottom: 20px;
  }

  .bg-purple {
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    text-align: center
  }
</style>
