import Vue from 'vue'
import Vuex from 'vuex'

import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

Vue.use(Vuex)

const state = {
  publicParameters: {
    identityListDialog: false,
    companyInfoDialog: false,
    adminInfoDialog: false,
    modifyPwdDialog: false,
    returnButtom: false,
    head: localStorage.getItem('head'),
    name: localStorage.getItem('username') + localStorage.getItem('positionName'),
    path: '',
    domain: 'http://192.168.0.100:30000/cloud/window/v1'
    // domain: 'http://dev.cloud.360baige.com/cloud/window/v1'
  },
  userPositionList: {
    list: {}
  },
  messageList: {
    list: [
      {
        id: 1,
        title: '[更新] 校园卫士更新了,有需要的学校请自行更新!'
      }, {
        id: 2,
        title: '[更新] 校园卫士更新了,有需要的学校请自行更新！'
      }, {
        id: 3,
        title: '[更新] 校园卫士更新了,有需要的学校请自行更新！'
      }
    ]
  },
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
    ],
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
    list: []
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
