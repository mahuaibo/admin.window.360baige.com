<template>
  <div class="index">
    <div class="appStore-operatingArea">
      <div class="appCenter-seek">
        <el-input class="appStore-seek" placeholder="请输入名称..." icon="search" v-model="appStore.appSeek"
                  :on-icon-click="handleIconClick" style="width: 298px;height: 38px;"></el-input>
      </div>
      <!--<el-select v-model="appStore.appType" class="appStore-choicebox"> &lt;!&ndash; :visible-change="typeFilter()" &ndash;&gt;-->
      <!--<el-option v-for="item in appStoreData.appTypeList" :label="item.label" :value="item.value"></el-option>-->
      <!--</el-select>-->
    </div>
    <div class="appStore-list">
      <div class="appStore-list-noData" v-if="appStoreData.appList==''">暂无数据</div>
      <div v-for="val in appStoreData.appList" class="appStore-app-card" v-else>
        <div class="appStore-app-card-left">
          <img :src="val.image" style="width: 70px;height: 70px;border-radius: 20px;">
          <el-button style="margin-top:6px;width:70px;height:22px;" type="primary" size="mini"  @click="appSubscribe(val)">
            {{ val.price }} / <label v-if="val.payCycle==1">月</label>
            <label v-else-if="val.payCycle==2">季</label><label v-else-if="val.payCycle==3">半年</label>
            <label v-else-if="val.payCycle==2">年</label><label v-else>无</label>
          </el-button>
        </div>
        <div class="appStore-app-card-right">
          <div style="font-size: 16px;margin-top: 2px;color: #505050;">{{ val.name }}</div>
          <div style="font-size: 14px;margin-top: 4px;width: 130px;color: #808080;height:58px;overflow: hidden;">
            <label>{{ val.desc }}</label>
          </div>
          <div class="subscription">已订阅<label style="color: #fe4f4f;"> {{ val.subscription }} </label>次</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  //  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  export default {
    created () {
      this.publicParameters.returnButtom = true
      this.publicParameters.path = '/application/center'
      this.initApplicationTplData(this.appStore)
    },
    computed: {
      ...mapGetters([
        'appStoreData',
        'publicParameters'
      ])
    },
    data () {
      return {
        appStore: {
          appSeek: null,
          appType: '0'
        }
      }
    },
    methods: {
      ...mapActions([
        'handleClick',
        'initApplicationTplData'
      ]),
      handleIconClick (ev) {  // 搜索
        this.initApplicationTplData(this.appStore)
      },
      appSubscribe (val) { // 订阅
        this.handleClick('/application/appTplDetail?i=' + val.id)
      },
      messageRemind  (type, info) { // type success成功   warning警告   error失败
        this.$message({message: info, type: type})
        return false
      }
    }
  }
</script>
<style lang="scss" scoped>
  .appStore-operatingArea {
    height: 38px;
    padding-top: 12px;
    padding-bottom: 30px;
    .appCenter-seek {
      position: absolute;
      left: 42px;
    }
  }

  .appStore-list {
    position: absolute;
    left: 20px;
    right: 20px;
    height: calc(100vh - 150px);
    overflow: scroll;
  }

  .appStore-app-card {
    width: 216px;
    height: 106px;
    float: left;
    padding-left: 24px;
    padding-right: 24px;
    padding-bottom: 44px;
    .appStore-app-card-left {
      width: 70px;
      height: 106px;
      float: left;
    }
    .appStore-app-card-right {
      width: 130px;
      height: 108px;
      float: right;
      margin-left: 16px;
      text-align: left;
    }
  }

  .subscription {
    font-size: 12px;
    margin-bottom: 0px;
    height: 22px;
    line-height: 22px;
    text-align: right;
    color: #808080;
  }

</style>
