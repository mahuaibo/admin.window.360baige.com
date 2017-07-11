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
    appList: [
      {
        img: '../../assets/logo.png',
        name: '飞机大战',
        describe: '特别NB的应用，你值得拥有！'
      }, {
        img: '../../assets/logo.png',
        name: '校园新闻',
        describe: '特别NB的应用，你值得拥有！'
      }, {
        img: '../../assets/logo.png',
        name: '课外拓展',
        describe: '特别NB的应用，你值得拥有！'
      }, {
        img: '../../assets/logo.png',
        name: '有声读物',
        describe: '特别NB的应用，你值得拥有！'
      }, {
        img: '../../assets/logo.png',
        name: '有声读物',
        describe: '特别NB的应用，你值得拥有！'
      }, {
        img: '../../assets/logo.png',
        name: '有声读物',
        describe: '特别NB的应用，你值得拥有！'
      }, {
        img: '../../assets/logo.png',
        name: '有声读物',
        describe: '特别NB的应用，你值得拥有！'
      }
    ]
  },
  accountData: {
    list: [{
      date: '2016-05-02',
      type: '现金支出',
      dealType: '支出',
      money: '100.00'
    }, {
      date: '2016-05-04',
      type: '现金支出',
      dealType: '支出',
      money: '100.00'
    }, {
      date: '2016-05-01',
      type: '现金支出',
      dealType: '支出',
      money: '100.00'
    }]
  },
  transactionDetailData: {
    list: [{
      date: '2016-05-02',
      type: '现金支出',
      dealType: '支出',
      money: '100.00',
      balance: '120.00'
    }, {
      date: '2016-05-04',
      type: '现金支出',
      dealType: '支出',
      money: '100.00',
      balance: '120.00'
    }, {
      date: '2016-05-01',
      type: '现金支出',
      dealType: '支出',
      money: '100.00',
      balance: '120.00'
    }]
  },
  appCenterData: {
    list: [{
      date: '2016-05-02',
      img: '../../assets/logo.png',
      name: '王小虎',
      status: '启用'
    }, {
      date: '2016-05-04',
      img: '../../assets/logo.png',
      name: '王小虎',
      status: '停用'
    }, {
      date: '2016-05-01',
      img: '../../assets/logo.png',
      name: '王小虎',
      status: '启用'
    }, {
      date: '2016-05-03',
      img: '../../assets/logo.png',
      name: '王小虎',
      status: '启用'
    }]
  },
  loggerData: {
    list: [{
      date: '2016-05-02',
      name: 'admin',
      type: '修改',
      describe: '修改用户密码'

    }, {
      date: '2016-05-04',
      name: '王小虎',
      type: '新增',
      describe: '新增应用'
    }, {
      date: '2016-05-01',
      name: '王小虎',
      type: '修改',
      describe: '修改应用权限'
    }]
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
