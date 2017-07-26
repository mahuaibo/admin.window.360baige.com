<template>
  <div class="index">
    <div class="content-head">

    </div>
    <div class="comtent-list">
      <el-table :data="loggerData.list" border style="width: 100%">
        <el-table-column label="日期" width="213">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作类型" width="214">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作描述">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.remark }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comtent-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="loggerListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="loggerListData.pageSize" layout="sizes, prev, pager, next"
                     :total="loggerListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initLoggerListData(this.loggerListData)
    },
    computed: {
      ...mapGetters([
        'loggerData'
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
  .content-head {
    padding-bottom: 60px;
  }

  .comtent-paging {
    padding-top: 20px;
  }
</style>
