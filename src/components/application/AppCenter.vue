<template>
  <div class="index">
    <div class="appCenter-operatingArea">
      <el-input class="appCenter-seek" placeholder="请选择名称" icon="search" v-model="appSeek"
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
        'appCenterData'
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
      handleIconClick (ev) {
        console.log(ev)
      },
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
