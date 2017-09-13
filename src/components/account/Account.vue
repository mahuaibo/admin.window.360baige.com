<template>
  <div class="index">
    <div class="account-head">
      <div class="account-head-stats">
        <el-row :gutter="24">
          <el-col :span="6">
            <div class="account-head-stats-balance"><label>账户余额(￥)</label>：{{ money(statistical.balance) }}</div>
          </el-col>
          <el-col :span="6">
            <div class="account-head-stats-inAccount"><label>总进账(￥)</label>：{{ money(statistical.inAccount) }}</div>
          </el-col>
          <el-col :span="6">
            <div class="account-head-stats-outAccount"><label>总出账(￥)</label>：{{ money(statistical.outAccount) }}</div>
          </el-col>
          <el-col :span="6">
            <div @click="handleClick('/account/transactionDetail')" class="account-head-stats-detailButton">
              <span>交易明细 >></span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="account-head-overview">
        <el-tabs v-model="activeName" @tab-click="getAccountData">
          <el-tab-pane label="　近1月　" name="1"></el-tab-pane>
          <el-tab-pane label="　近3月　" name="2"></el-tab-pane>
          <el-tab-pane label="　近6月　" name="3"></el-tab-pane>
          <el-tab-pane label="　近1年　" name="4"></el-tab-pane>
        </el-tabs>
        <el-row :gutter="12">
          <el-col :span="6">
            <div class="account-head-overview-inAccount">
              <label>进账(￥)</label><span>：{{ money(accountListData.inAccount) }}</span>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="account-head-overview-outAccount">
              <label>出账(￥)</label><span>：{{ money(accountListData.outAccount) }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="account-list">
      <el-table :data="accountData.list" max-height="380">
        <el-table-column label="日期">
          <template scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额(￥)">
          <template scope="scope">
            <span v-if="scope.row.amount>=0" class="account-list-topUp">+{{ money(scope.row.amount) }} (充值)</span>
            <span v-else-if="scope.row.amount<0" class="account-list-consume">{{ money(scope.row.amount)}} (消费)</span>
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
    <div class="account-list-paging">
      <el-pagination @size-change="accountRefreshListData" @current-change="accountRefreshListData"
                     :page-sizes="[50, 100, 200]" :total="accountListData.total"
                     :current-page.sync="accountListData.current" :page-size="accountListData.pageSize"
                     layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="accountDetailModal" size="tiny" :before-close="cancel"
               :close-on-click-modal="false">
      <el-form ref="form" :model="accountFrom" label-width="100px" class="account-detail-from">
        <el-form-item label="交易时间：">{{ accountFrom.createTime }}</el-form-item>
        <el-form-item label="交易金额：">
          <span v-if="accountFrom.amount>=0" class="account-detail-topUp">+{{ money(accountFrom.amount) }} (充值)</span>
          <span v-else-if="accountFrom.amount<0" class="account-detail-consume">{{ money(accountFrom.amount)
            }} (消费)</span>
        </el-form-item>
        <el-form-item label="描　　述：">{{ accountFrom.remark }}</el-form-item>
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
      this.initAccountData(this.statistical)
      this.initAccountListData(this.accountListData)
    },
    computed: {
      ...mapGetters([
        'accountData',
        'publicParameters'
      ])
    },
    data () {
      return {
        activeName: '1',
        statistical: {
          balance: null,          // 余额
          inAccount: null,        // 总入账
          outAccount: null        // 总出账
        },
        accountListData: {
          inAccount: 0,           // 进账
          outAccount: 0,          // 出账
          cycleType: '1',
          pageSize: 50,
          current: 1,
          total: 1
        },
        accountDetailModal: false,
        accountFrom: {
          createTime: null,       // 创建时间
          orderCode: null,        // 订单编码
          amountType: null,       // 交易金额类型
          amount: null,           // 交易金额
          remark: null,           // 备注
          balance: null,          // 平账
          to_account: null        // 收款人公司
        }
      }
    },
    methods: {
      ...mapActions([
        'initAccountData',
        'initAccountListData',
        'handleClick'
      ]),
      money (amount) {
        if (amount === 0) {
          return '0.00'
        } else {
          return amount / 100
        }
      },
      handleDetail (row) {
        var accountDetailModal = true
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
            current.accountFrom = response.data.data
          } else {
            current.messageRemind('error', '获取信息失败！')
            accountDetailModal = false
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.accountDetailModal = accountDetailModal
      },
      getAccountData (index) {
        this.accountListData.cycleType = index.name
        this.accountRefreshListData()
      },
      accountRefreshListData () {
        this.initAccountListData(this.accountListData)
      },
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      },
      cancel () { // 点击取消清空表单
        this.accountDetailModal = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .account-head {
    margin-top: 12px;
    padding-left: 20px;
    padding-right: 20px;
    .account-head-stats {
      border: 1px solid #dae8f6;
      background-color: #eef6fe;
      margin-bottom: 32px;
      .account-head-stats-balance {
        text-align: left;
        height: 55px;
        line-height: 55px;
        padding-left: 20px;
        font-size: 14px;
      }
      .account-head-stats-inAccount {
        text-align: left;
        height: 55px;
        line-height: 55px;
        padding-left: 20px;
        font-size: 14px;
      }
      .account-head-stats-outAccount {
        text-align: left;
        height: 55px;
        line-height: 55px;
        padding-left: 20px;
        font-size: 14px;
      }
      .account-head-stats-detailButton {
        text-align: right;
        height: 55px;
        line-height: 55px;
        padding-right: 20px;
        font-size: 12px;
        color: #31a7ff;
        cursor: pointer;
      }
      label {
        font-weight: bold;
      }
    }
    .account-head-overview {
      height: auto;
      margin-bottom: 20px;
      .account-head-overview-inAccount, .account-head-overview-outAccount {
        text-align: left;
        padding-left: 20px;
        font-size: 14px;
      }
      label {
        font-weight: bold;
      }
    }
  }

  .account-list {
    padding-left: 20px;
    padding-right: 20px;
    .account-list-topUp {
      color: #0BB20C;
    }
    .account-list-consume {
      color: red;
    }
  }

  .account-list-paging {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }

  .account-detail-from {
    text-align: left;
    padding: 0px 10px 0px 0px;
    .account-detail-topUp {
      color: #0BB20C;
    }
    .account-detail-consume {
      color: red;
    }
  }

  /*.bg-purple {*/
  /*height: 55px;*/
  /*line-height: 55px;*/
  /*}*/
</style>
