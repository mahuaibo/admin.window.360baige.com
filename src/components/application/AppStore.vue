<template>
  <div class="index">
    <div class="appStore-operatingArea">
      <el-select v-model="appStore.appType" placeholder="请选择" class="appStore-choicebox">
        <el-option v-for="item in appStoreData.appTypeList" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input class="appStore-seek" placeholder="请选择名称" icon="search" v-model="appStore.appSeek"
                :on-icon-click="handleIconClick"></el-input>
    </div>
    <div class="appStore-list">
      <div class="appStore-list-noData" v-if="appStoreData.appList==''">暂无数据</div>
      <div v-for="val in appStoreData.appList" class="appStore-app-card" v-else>
        <div class="appStore-app-card-name">
          <img :src="val.img" height="60" width="60"/>
          <label class="name">{{ val.name }}</label>
        </div>
        <div class="appStore-app-card-describe">
          <textarea rows="4" cols="30" disabled="disabled" readonly="readonly">{{ val.describe }}</textarea>
        </div>
        <div class="appStore-app-card-button">
        <span class="wrapper">
          <el-button type="success" @click="appSubscribe(val.id)"> 订阅 </el-button>
          <el-button type="warning" :plain="true" @click="appDetail(val.id)"> 详情 </el-button>
        </span>
        </div>
      </div>
    </div>
    <el-dialog title="详情" :visible.sync="appStore.detailModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="detailForm" label-width="90px">
        <el-form-item label="应用图标：">{{ detailForm.img }}</el-form-item>
        <el-form-item label="应用名称：">{{ detailForm.name }}</el-form-item>
        <el-form-item label="应用简介：">{{ detailForm.brief }}</el-form-item>
        <el-form-item label="价格：">{{ detailForm.price }}</el-form-item>
        <el-form-item label="开发公司：">{{ detailForm.companyName }}</el-form-item>
        <el-form-item label="开发时间：">{{ detailForm.time }}</el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="付费说明" :visible.sync="appStore.orderModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="orderForm" label-width="90px">
        <el-form-item label="付费说明：">{{ detailForm.date }}</el-form-item>
        <el-form-item label="缴费选项：">{{ detailForm.type }}</el-form-item>
        <el-form-item label="支付方式：">{{ detailForm.balance }}</el-form-item>
        <span class="wrapper">
          <el-button type="success" @click="appStore.orderModal=true"> 确定订单 </el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.initApplicationTplData(this.appListData)
    },
    computed: {
      ...mapGetters([
        'appStoreData'
      ])
    },
    data () {
      return {
        appStore: {
          appSeek: null,
          appType: '1',
          detailModal: false,
          orderModal: false
        },
        detailForm: {
          img: null,
          name: null,
          brief: null,
          price: null,
          companyName: null,
          time: null
        },
        orderForm: {
          date: null,
          type: null,
          balance: null
        }
      }
    },
    methods: {
      ...mapActions([
        'initApplicationTplData',
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
      cancel () { // 点击取消清空表单
        this.appStore.detailModal = false
        this.appStore.orderModal = false
      },
      appSubscribe (val) {
        this.appStore.orderModal = true
        console.log(val)
      },
      appDetail (val) {
        var current = this
        axios({
          method: 'GET',
          url: 'http://localhost:30000/cloud/window/v1/application_tpl/detail',
          params: {
            access_token: localStorage.getItem('positionAccessToken'),
            id: val
          }
        }).then(function (response) {
          console.log(response.data)
          if (response.data.code === '200') {
            current.detailForm.img = response.data.data.image
            current.detailForm.name = response.data.data.name
            current.detailForm.brief = response.data.data.desc
            current.detailForm.price = response.data.data.price
            current.detailForm.companyName = response.data.data.company_name
            current.detailForm.time = response.data.data.create_time
          }
        }).catch(function (error) {
          console.log(error)
        })
        this.appStore.detailModal = true
      }
    }
  }
</script>
<style>
  .appStore-operatingArea {
    padding-bottom: 10px;
    width: 425px;
  }

  .appStore-seek {
    width: 200px;
  }

  .appStore-app-card {
    background: rgba(228, 228, 228, 1);
    border-radius: 5px;
    border: 1px solid #cccccc;
    width: 205px;
    height: 200px;
    float: left;
    margin: 12px;
  }

  .name {
    position: relative;
    top: -25px;
    left: 15px;
  }

  .appStore-app-card-name {
    margin: 10px;
  }

  .appStore-app-card-describe {
    height: 70px;
  }

  textarea {
    resize: none;
    background: rgba(228, 228, 228, 1);
    border: 0px solid red;
    padding: 0px;
  }

  .appStore-app-card-button {
    border-radius: 5px;
    background: #ffffff;
    height: 36px;
    padding: 4px;
  }

  .appStore-list-noData {
    position: absolute;
    left: 33px;
    margin-top: 20px;
    color: #5e7382;
  }
</style>
