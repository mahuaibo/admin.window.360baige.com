<template>
  <div class="index">
    <div class="account-content-head">
      <div class="account-content-head-detail">
        <el-row :gutter="24">
          <el-col :span="6">
            <div style="text-align: left;height:55px;line-height:55px;padding-left: 20px;font-size: 14px;">
              <label style="font-weight: bold;">账户余额(￥)</label>：{{ money(statistical.balance) }}
            </div>
          </el-col>
          <el-col :span="6">
            <div style="text-align: left;height:55px;line-height:55px;padding-left: 20px;font-size: 14px;">
              <label style="font-weight: bold;">总进账(￥)</label>：{{ money(statistical.inAccount) }}
            </div>
          </el-col>
          <el-col :span="6">
            <div style="text-align: left;height:55px;line-height:55px;padding-left: 20px;font-size: 14px;">
              <label style="font-weight: bold;">总出账(￥)</label>：{{ money(statistical.outAccount) }}
            </div>
          </el-col>
          <el-col :span="6">
            <div @click="handleClick('/account/transactionDetail')"
                 style="text-align: right;height:55px;line-height:55px;padding-right: 20px;font-size: 12px;color: #31a7ff;">
              交易明细 >>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="account-content-head-overview">
        <el-tabs v-model="activeName" @tab-click="getAccountData">
          <el-tab-pane label="　近1月　" name="1"></el-tab-pane>
          <el-tab-pane label="　近3月　" name="2"></el-tab-pane>
          <el-tab-pane label="　近6月　" name="3"></el-tab-pane>
          <el-tab-pane label="　近1年　" name="4"></el-tab-pane>
        </el-tabs>
        <el-row :gutter="12">
          <el-col :span="6">
            <div style="text-align: left;padding-left: 20px;font-size: 14px;">
              <label style="font-weight: bold;">进账(￥)</label>：{{ money(accountListData.inAccount)}}
            </div>
          </el-col>
          <el-col :span="6">
            <div style="text-align: left;padding-left: 20px;font-size: 14px;">
              <label style="font-weight: bold;">出账(￥)</label>：{{ money(accountListData.outAccount)}}
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="account-comtent-list">
      <el-table :data="accountData.list" style="width: 100%" max-height="380">
        <el-table-column label="日期" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="交易金额(￥)" initApplicationTplDatawidth="180">
          <template scope="scope">
            <span v-if="scope.row.amount>=0" style="margin-left: 10px;color: #0BB20C;">+{{ money(scope.row.amount)
              }} (充值)</span>
            <span v-else-if="scope.row.amount<0" style="margin-left: 10px;color: red;">{{ money(scope.row.amount)
              }} (消费)</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" initApplicationTplDatawidth="180">
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
    <div class="account-comtent-paging">
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="accountListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="accountListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="accountListData.total">
      </el-pagination>
    </div>

    <el-dialog title="详情" :visible.sync="accountDetailModal" size="tiny" :before-close="cancel" :close-on-click-modal="false">
      <el-form ref="form" :model="accountFrom" label-width="100px" style="text-align:left;padding:0px 10px 0px 0px;">
        <el-form-item label="交易时间：">{{ accountFrom.createTime }}</el-form-item>
        <el-form-item label="交易金额：">
          <span v-if="accountFrom.amount>=0" style="margin-left: 10px;color: #0BB20C;">+{{ money(accountFrom.amount)
            }} (充值)</span>
          <span v-else-if="accountFrom.amount<0" style="margin-left: 10px;color: red;">{{ money(accountFrom.amount)
            }} (消费)</span>
        </el-form-item>
        <el-form-item label="描　　述：">{{ accountFrom.remark }}</el-form-item>
        <!--<el-form-item label="订 单 号：">{{ accountFrom.orderCode }} 查看</el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

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
          inAccount: null,       // 总入账
          outAccount: null   // 总出账
        },
        accountListData: {
          inAccount: 0, // 进账
          outAccount: 0, // 出账
          cycleType: '1',
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
      money (amount) {
        if (amount === 0) {
          return '0.00'
        } else {
          return amount / 100
        }
      },
      handleDetail (row) {
        var modalData = true
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
            current.accountFrom.createTime = response.data.data.createTime
            current.accountFrom.orderCode = response.data.data.orderCode
            current.accountFrom.amountType = response.data.data.amountType
            current.accountFrom.amount = response.data.data.amount
            current.accountFrom.remark = response.data.data.remark
          } else {
            current.messageRemind('error', '获取信息失败！')
            modalData = false
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.accountDetailModal = modalData
      },
      getAccountData (index) {
        this.accountListData.cycleType = index.name
        this.initAccountListData(this.accountListData)
      },
      handleSizeChange () {
        this.initAccountListData(this.accountListData)
      },
      handleCurrentChange () {
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
  .account-content-head {
    margin-top: 12px;
    padding-left: 20px;
    padding-right: 20px;
    .account-content-head-detail {
      border: 1px solid #dae8f6;
      background-color: #eef6fe;
      margin-bottom: 32px;
    }
    .account-content-head-overview {
      height: auto;
      margin-bottom: 20px;
    }
  }

  .account-comtent-list {
    padding-left: 20px;
    padding-right: 20px;
    /*height: calc(100vh - 360px);*/
    /*overflow: scroll;*/
  }

  .account-comtent-paging {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }

  .bg-purple {
    height: 55px;
    line-height: 55px;
  }
</style>
