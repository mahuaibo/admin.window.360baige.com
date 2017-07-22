import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Login from '@/components/admin/Login'
import Register from '@/components/admin/Register'
import MyInfo from '@/components/admin/MyInfo'
import ModifyPassword from '@/components/admin/ModifyPassword'
import CompanyInfo from '@/components/company/Info'
import AppCenter from '@/components/application/AppCenter'
import AppStore from '@/components/application/AppStore'
import Account from '@/components/account/Account'
import TransactionDetail from '@/components/account/TransactionDetail'
import Order from '@/components/order/Order'
import Logger from '@/components/logger/Logger'
import SystemMessage from '@/components/system/Message'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'register',
    component: Register,
    path: '/register',
    alias: 'register'
  }, {
    name: 'login',
    component: Login,
    path: '/login',
    alias: 'login'
  }, {
    name: 'home',
    component: Home,
    path: '/home',
    alias: '',
    children: [{
      name: 'myInfo',
      component: MyInfo,
      path: '/myInfo',
      alias: 'myInfo'
    }, {
      name: 'modifyPassword',
      component: ModifyPassword,
      path: '/modifyPassword',
      alias: 'modifyPassword'
    }, {
      name: 'companyInfo',
      component: CompanyInfo,
      path: '/companyInfo',
      alias: 'companyInfo'
    }, {
      name: 'appCenter',
      component: AppCenter,
      path: '/appCenter',
      alias: 'appCenter'
    }, {
      name: 'appStore',
      component: AppStore,
      path: '/appStore',
      alias: 'appStore'
    }, {
      name: 'account',
      component: Account,
      path: '/account',
      alias: 'account'
    }, {
      name: 'transactionDetail',
      component: TransactionDetail,
      path: '/transactionDetail',
      alias: 'transactionDetail'
    }, {
      name: 'order',
      component: Order,
      path: '/order',
      alias: 'order'
    }, {
      name: 'logger',
      component: Logger,
      path: '/logger',
      alias: 'logger'
    }, {
      name: 'systemMessage',
      component: SystemMessage,
      path: '/systemMessage',
      alias: 'systemMessage'
    }]
  }]
})
