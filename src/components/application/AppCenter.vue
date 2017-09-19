<template>
  <div class="index">
    <div class="appCenter-operatingArea">
      <div class="appCenter-operatingArea-seek">
        <el-input placeholder="请输入名称..." icon="search" v-model="appListData.appSeek"
                  :on-icon-click="appCenterRefreshListData" class="appCenter-operatingArea-seek-input"></el-input>
        <img src="../../assets/app_store.png" @click="handleClick('/application/store')"
             class="appCenter-operatingArea-seek-button">
      </div>
    </div>
    <div class="appCenter-list">
      <el-table :data="appCenterData.list" max-height="510">
        <el-table-column label="应用图标">
          <template scope="scope">
            <img :src="scope.row.image" class="appCenter-list-img"/>
          </template>
        </el-table-column>
        <el-table-column label="应用名称">
          <template scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="服务截止时间">
          <template scope="scope">
            <span class="appCenter-list-entTime">{{ toDatetime(scope.row.endTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template scope="scope">
            <el-button size="small" type="text" @click="disableApp(scope.row)" v-if="scope.row.status==0">启用</el-button>
            <el-button size="small" type="text" @click="enableApp(scope.row)" v-else>停用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template scope="scope">
            <el-button size="small" type="text" @click="enterApp(scope.row)">进入</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="appCenter-paging">
      <el-pagination @size-change="appCenterRefreshListData" @current-change="appCenterRefreshListData"
                     :page-sizes="[50, 100, 200]"
                     :current-page.sync="appListData.current" :total="appListData.total"
                     :page-size="appListData.pageSize" layout="total, sizes, prev, pager, next, jumper">
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
      appCenterRefreshListData (ev) {  // 搜索
        this.initApplicationData(this.appListData)
      },
      enterApp (index) { // 进入应用
        var theDay = new Date()
        var theTime = theDay.getTime()
        if (theTime < index.endTime) {
          window.open(index.site + '?a=' + localStorage.getItem('accessToken'))
        } else {
          this.messageRemind('warning', '请续费后使用...')
        }
      },
      enableApp (index) { // 启用
        this.submitData.url = this.publicParameters.domain + '/application/modifyStatus'
        this.submitData.appId = index.id
        this.submitData.status = 0
        this.submitData.remindMessage = '启用'
        this.submit()
      },
      disableApp (index) { // 停用
        this.submitData.url = this.publicParameters.domain + '/application/modifyStatus'
        this.submitData.appId = index.id
        this.submitData.status = 1
        this.submitData.remindMessage = '停用'
        this.submit()
      },
      submit () {
        var current = this
        axios({
          method: 'post',
          url: current.submitData.url,
          params: {
            accessToken: localStorage.getItem('accessToken'),
            id: current.submitData.appId,
            status: current.submitData.status
          }
        }).then(function (response) {
          console.log(response.data)
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
      messageRemind (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .appCenter-operatingArea {
    margin-top: 12px;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
    .appCenter-operatingArea-seek {
      margin-bottom: 32px;
      .appCenter-operatingArea-seek-input {
        width: 298px;
        height: 38px;
      }
      .appCenter-operatingArea-seek-button {
        float: right;
        width: 108px;
        height: 34px
      }
    }
  }

  .appCenter-list {
    padding-left: 20px;
    padding-right: 20px;
    .appCenter-list-img {
      width: 30px;
      height: 30px;
      margin-top: 8px;
    }
    .appCenter-list-entTime {
      color: red;
    }
  }

  .appCenter-paging {
    float: right;
    margin-top: 30px;
    margin-right: 20px;
  }
</style>
