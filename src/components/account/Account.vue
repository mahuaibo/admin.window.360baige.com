<template>
  <div class="index">
    <div class="content-head">
      <el-row :gutter="20" style="padding-bottom: 20px;">
        <el-col :span="6">
          <div class="bg-purple">账户余额(￥)：1160.00</div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">总入账(￥)：1260.00</div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">总出账(￥)：100.00</div>
        </el-col>
        <el-col :span="6">
          <div class="bg-purple">
            <el-button type="text">
              <el-button type="text" @click="handleClick('/transactionDetail')">查看交易明细>></el-button>
            </el-button>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="9">
          <div class="bg-purple">&nbsp;&nbsp;&nbsp;本月账单：存入(￥)：634.00   支出(￥)：634.00 </div>
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
        <el-table-column label="金额" width="180">
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
                     :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]"
                     :page-size="100" layout="sizes, prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'accountData'
      ])
    },
    data () {
      return {
        appSeek: null,
        currentPage: 2
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
