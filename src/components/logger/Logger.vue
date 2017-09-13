<template>
  <div class="index">
    <div class="comtent-list">
      <el-table :data="loggerData.list" max-height="810">
        <el-table-column label="操作时间" width="213">
          <template scope="scope">
            <span>{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作类型" width="214">
          <template scope="scope">
            <span>{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作描述">
          <template scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
        <el-table-column label="IP地址" width="214">
        </el-table-column>
        <el-table-column label="操作者信息" width="214">
        </el-table-column>
      </el-table>
      <el-pagination class="comtent-paging" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="loggerListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="loggerListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="loggerListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    created () {
      this.publicParameters.returnButtom = false
      this.initLoggerListData(this.loggerListData)
    },
    computed: {
      ...mapGetters([
        'loggerData',
        'publicParameters'
      ])
    },
    data () {
      return {
        loggerListData: {
          pageSize: 50,
          current: 1,
          total: 1
        }
      }
    },
    methods: {
      ...mapActions([
        'initLoggerListData'
      ]),
      handleSizeChange (val) {
        this.initLoggerListData(this.loggerListData)
      },
      handleCurrentChange (val) {
        this.initLoggerListData(this.loggerListData)
      }
    }
  }
</script>
<style>
  .comtent-list {
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 12px;
  }

  .comtent-paging {
    float: right;
    padding: 30px 0px 0px 0px;
  }
</style>
