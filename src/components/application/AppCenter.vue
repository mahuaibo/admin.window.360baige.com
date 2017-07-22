<template>
  <div class="index">
    <div class="appCenter-operatingArea">
      <el-input class="appCenter-seek" placeholder="请输入名称..." icon="search" v-model="appListData.appSeek"
                :on-icon-click="handleIconClick"></el-input>
      <el-button class="appCenter-shop" type="success" @click="handleClick('/appStore')">应用商店</el-button>
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
            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">进入</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">退订</el-button>
            <el-button size="small" type="success" @click="handleEdit(scope.$index, scope.row)">启用</el-button>
            <el-button size="small" type="danger" @click="handleEdit(scope.$index, scope.row)">停用</el-button>
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
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initApplicationData(this.appListData)
    },
    computed: {
      ...mapGetters([
        'appCenterData'
      ])
    },
    data () {
      return {
        appListData: {
          pageSize: 50,
          current: 1,
          total: 0,
          appSeek: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'initApplicationData',
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
      handleIconClick (ev) {
        this.initApplicationData(this.appListData)
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
      },
      handleSizeChange (val) {
        this.initApplicationData(this.appListData)
      },
      handleCurrentChange (val) {
        this.initApplicationData(this.appListData)
      }
    }
  }
</script>
<style>
  .appCenter-operatingArea {
    padding-bottom: 50px;
  }

  .appCenter-seek {
    width: 200px;
    position: absolute;
    left: 21px;
  }

  .appCenter-shop {
    position: absolute;
    right: 21px;
  }

  .cappCenter-paging {
    padding-top: 20px;
  }
</style>
