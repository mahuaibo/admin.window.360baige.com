<template>
  <div class="index">
    <div class="appCenter-operatingArea">
      <el-input class="appCenter-seek" placeholder="请输入名称..." icon="search" v-model="appListData.appSeek"
                :on-icon-click="handleIconClick"></el-input>
      <el-button class="appCenter-shop" type="success" @click="handleClick('/application/store')">应用商店</el-button>
    </div>
    <div class="appCenter-list">
      <el-table :data="appCenterData.list" border style="width: 100%">
        <el-table-column label="日期" width="180">
          <template scope="scope">
            <el-icon name="time"></el-icon>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用图标" width="120">
          <template scope="scope">
            <span style="margin-left: 10px"><img :src="scope.row.img"/></span>
          </template>
        </el-table-column>
        <el-table-column label="应用名称" width="140">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" @click="enterApp(scope.$index, scope.row)">进入</el-button>
            <el-button size="small" type="danger" @click="unsubscribeApp(scope.$index, scope.row)">退订</el-button>
            <el-button size="small" type="success" @click="enableApp(scope.$index, scope.row)">启用</el-button>
            <el-button size="small" type="danger" @click="disableApp(scope.$index, scope.row)">停用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="cappCenter-paging">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="appListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="appListData.pageSize" layout="sizes, prev, pager, next" :total="appListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initApplicationData(this.appListData)
      this.defaultActive.index = '/application/center'
    },
    computed: {
      ...mapGetters([
        'appCenterData',
        'defaultActive'
      ])
    },
    data () {
      return {
        appListData: {
          pageSize: 50,
          current: 1,
          total: 1,
          appSeek: ''
        },
        submitData: {
          accessPath: null, // 访问路径
          appId: null, // 应用ID
          status: null, // 应用状态
          remindMessage: null // 提示消息
        }
      }
    },
    methods: {
      ...mapActions([
        'initApplicationData',
        'handleClick'

      ]),
      handleIconClick (ev) {  // 搜索
        this.initApplicationData(this.appListData)
      },
      handleSizeChange (val) { // 切换显示条数
        this.initApplicationData(this.appListData)
      },
      handleCurrentChange (val) { // 翻页
        this.initApplicationData(this.appListData)
      },
      enterApp (state, index) { // 进入应用
        this.submitData.accessPath = ''
        this.submitData.appId = index.id
        this.submit()
      },
      unsubscribeApp (state, index) { // 退订
        this.submitData.accessPath = ''
        this.submitData.appId = index.id
        this.submit()
      },
      enableApp (state, index) { // 启用
        this.submitData.accessPath = 'http://localhost:30000/cloud/window/v1/application/modifystatus'
        this.submitData.appId = index.id
        this.submitData.status = 1
        this.submitData.remindMessage = '启用'
        this.submit()
      },
      disableApp (state, index) { // 停用
        this.submitData.accessPath = 'http://localhost:30000/cloud/window/v1/application/modifystatus'
        this.submitData.appId = index.id
        this.submitData.status = 0
        this.submitData.remindMessage = '停用'
        this.submit()
      },
      submit () {
        var current = this
        axios({
          method: 'GET',
          url: current.submitData.accessPath,
          params: {
            access_token: localStorage.getItem('positionAccessToken'),
            id: current.submitData.appId,
            status: current.submitData.status
          }
        }).then(function (response) {
          if (response.data.code === '200') {
            current.messageRemind('success', current.submitData.remindMessage + '成功！')
            current.initApplicationData(current.appListData) // 更新数据
          } else {
            current.messageRemind('error', current.submitData.remindMessage + '失败！')
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      messageRemind  (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .appCenter-operatingArea {
    padding-bottom: 50px;
    .appCenter-seek {
      width: 200px;
      float: left;
    }
    .appCenter-shop {
      float: right;
    }
  }

  .cappCenter-paging {
    padding-top: 20px;
  }
</style>
