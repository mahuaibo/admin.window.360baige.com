<template>
  <div class="index">
    <div class="appCenter-operatingArea">
      <div class="appCenter-seek">
        <el-input placeholder="请输入名称..." icon="search" v-model="appListData.appSeek"
                  :on-icon-click="handleIconClick" style="width: 298px;height: 38px;"></el-input>
      </div>
      <div class="appCenter-shop">
        <el-button type="success" @click="handleClick('/application/store')" style="width: 108px;height: 34px;">应用商店
        </el-button>
      </div>
    </div>
    <div class="appCenter-list">
      <el-table :data="appCenterData.list" style="width: 100%">
        <el-table-column label="日期" width="220">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="应用图标" width="180">
          <template scope="scope">
            <span style="margin-left: 10px"><img :src="scope.row.img"/></span>
          </template>
        </el-table-column>
        <el-table-column label="应用名称" width="180">
          <template scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180">
          <template scope="scope">
            <el-button size="small" type="text" @click="disableApp(scope.row)" v-if="scope.row.status==1">启用</el-button>
            <el-button size="small" type="text" @click="enableApp(scope.row)" v-else>停用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="enterApp(scope.row)">进入</el-button>
            <el-button size="small" type="text" @click="unsubscribeApp(scope.row)">退订</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="cappCenter-paging" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="appListData.current" :page-sizes="[50, 100, 200]"
                     :page-size="appListData.pageSize" layout="total, sizes, prev, pager, next, jumper"
                     :total="appListData.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.publicParameters.returnButtom = false
      this.initApplicationData(this.appListData)
    },
    computed: {
      ...mapGetters([
        'appCenterData',
        'publicParameters'
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
          url: null, // 访问路径
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
      enterApp (index) { // 进入应用
        console.log(index)
        window.open(index.site + '?a=' + localStorage.getItem('accessToken'))
      },
      unsubscribeApp (index) { // 退订
        this.submitData.url = ''
        this.submitData.appId = index.id
        console.log('1')
//        this.submit()
      },
      enableApp (index) { // 启用
        this.submitData.url = this.publicParameters.domain + '/application/modifyStatus'
        this.submitData.appId = index.id
        this.submitData.status = 1
        this.submitData.remindMessage = '启用'
        this.submit()
      },
      disableApp (index) { // 停用
        this.submitData.url = this.publicParameters.domain + 'application/modifyStatus'
        this.submitData.appId = index.id
        this.submitData.status = 0
        this.submitData.remindMessage = '停用'
        this.submit()
      },
      submit () {
        var current = this
        axios({
          method: 'GET',
          url: current.submitData.url,
          params: {
            access_token: localStorage.getItem('accessToken'),
            id: current.submitData.appId,
            status: current.submitData.status
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.messageRemind('success', current.submitData.remindMessage + '成功！')
            current.handleIconClick() // 更新数据
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
    height: 38px;
    padding-top: 12px;
    padding-bottom: 30px;
    .appCenter-seek {
      position: absolute;
      left: 40px;
    }
    .appCenter-shop {
      position: absolute;
      right: 40px;
    }
  }

  .appCenter-list {
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
    height: calc(100vh - 180px);
    overflow: scroll;
  }

  .cappCenter-paging {
    float: right;
    right: 40px;
    padding: 30px 0px 0px 0px;
  }
</style>
