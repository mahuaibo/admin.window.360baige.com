<template>
  <div class="index">
    <div class="appStore-operatingArea">
      <el-select v-model="appType" placeholder="请选择" class="appStore-choicebox">
        <el-option v-for="item in appStoreData.appTypeList" :label="item.label" :value="item.value"></el-option>
      </el-select>
      <el-input class="appStore-seek" placeholder="请选择名称" icon="search" v-model="appSeek"
                :on-icon-click="handleIconClick"></el-input>
    </div>
    <div class="appStore-list">
      <div v-for="val in appStoreData.appList" class="appStore-app-card">
        <div class="appStore-app-card-name">
          <img :src="val.img" height="60" width="60"/>
          <label class="name">{{ val.name }}</label>
        </div>
        <div class="appStore-app-card-describe">
          <textarea rows="4" cols="30" disabled="disabled" readonly="readonly">{{ val.describe }}</textarea>
        </div>
        <div class="appStore-app-card-button">
        <span class="wrapper">
          <el-button type="success" @click="orderModal=true"> 订阅 </el-button>
          <el-button type="warning" :plain="true" @click="detailModal=true"> 详情 </el-button>
        </span>
        </div>
      </div>
    </div>
    <el-dialog title="详情" :visible.sync="detailModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="detailForm" label-width="90px">
        <el-form-item label="应用图标：">{{ detailForm.date }}</el-form-item>
        <el-form-item label="应用名称：">{{ detailForm.type }}</el-form-item>
        <el-form-item label="应用简介：">{{ detailForm.payType }}</el-form-item>
        <el-form-item label="价格：">{{ detailForm.balance }}</el-form-item>
        <el-form-item label="开发公司：">{{ detailForm.orderNum }}</el-form-item>
        <el-form-item label="类别：">{{ detailForm.remark }}</el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="付费说明" :visible.sync="orderModal" size="tiny" :before-close="cancel">
      <el-form ref="form" :model="orderForm" label-width="90px">
        <el-form-item label="付费说明：">{{ detailForm.date }}</el-form-item>
        <el-form-item label="缴费选项：">{{ detailForm.type }}</el-form-item>
        <el-form-item label="支付方式：">{{ detailForm.balance }}</el-form-item>
        <span class="wrapper">
          <el-button type="success" @click="orderModal=true"> 确定订单 </el-button>
        </span>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'appStoreData'
      ])
    },
    data () {
      return {
        appSeek: null,
        appType: '1',
        detailModal: false,
        orderModal: false,
        detailForm: {},
        orderForm: {}
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
      cancel () { // 点击取消清空表单
        this.detailModal = false
        this.orderModal = false
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
    border-radius:5px;
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
    border-radius:5px;
    background: #ffffff;
    height: 36px;
    padding: 4px;
  }
</style>
