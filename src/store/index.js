import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  appStoreData: {
    appTypeList: [
      {
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '天气'
      }, {
        value: '2',
        label: '体育'
      }, {
        value: '3',
        label: '旅游'
      }, {
        value: '4',
        label: '工具'
      }, {
        value: '5',
        label: '视频'
      }, {
        value: '6',
        label: '社交'
      }, {
        value: '7',
        label: '参考'
      }, {
        value: '8',
        label: '效率'
      }, {
        value: '9',
        label: '摄影'
      }, {
        value: '10',
        label: '新闻'
      }, {
        value: '11',
        label: '音乐'
      }, {
        value: '12',
        label: '医学'
      }, {
        value: '13',
        label: '生活'
      }, {
        value: '14',
        label: '健康健美'
      }, {
        value: '15',
        label: '游戏'
      }, {
        value: '16',
        label: '财经'
      }, {
        value: '17',
        label: '娱乐'
      }, {
        value: '18',
        label: '教育'
      }, {
        value: '19',
        label: '商务'
      }, {
        value: '20',
        label: '图形设计'
      }, {
        value: '21',
        label: '软件开发'
      }
    ], // 应用类型list
    appList: []
  },
  accountData: {
    list: []
  },
  transactionDetailData: {
    list: []
  },
  appCenterData: {
    list: []
  },
  loggerData: {
    list: []
  },
  orderData: {
    list: [{
      date: '2016-05-02',
      orderNum: '2345678903232',
      name: 'Apple/苹果 iPhone7',
      price: '5288.00',
      number: '1'
    }, {
      date: '2016-05-04',
      orderNum: '2345678903232',
      name: 'Apple/苹果 iPhone7',
      price: '5288.00',
      number: '1'
    }, {
      date: '2016-05-01',
      orderNum: '2345678903232',
      name: 'Apple/苹果 iPhone7',
      price: '5288.00',
      number: '1'
    }]
  },
  defaultActive: {
    data: ''
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
