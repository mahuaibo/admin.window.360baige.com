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
// 应用路由
import PersonnelList from '@/components/personnel/List'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '*',
    redirect: '/home'
  }, {
    name: 'register',
    component: Register,
    path: '/admin/register',
    alias: 'register'
  }, {
    name: 'login',
    component: Login,
    path: '/admin/login',
    alias: 'login'
  }, {
    name: 'home',
    component: Home,
    path: '/home',
    alias: '',
    children: [{
      name: 'myInfo',
      component: MyInfo,
      path: '/admin/info',
      alias: 'myInfo'
    }, {
      name: 'modifyPassword',
      component: ModifyPassword,
      path: '/admin/modifyPassword',
      alias: 'modifyPassword'
    }, {
      name: 'companyInfo',
      component: CompanyInfo,
      path: '/company/info',
      alias: 'companyInfo'
    }, {
      name: 'appCenter',
      component: AppCenter,
      path: '/application/center',
      alias: 'appCenter'
    }, {
      name: 'appStore',
      component: AppStore,
      path: '/application/store',
      alias: 'appStore'
    }, {
      name: 'account',
      component: Account,
      path: 'account/list',
      alias: 'account'
    }, {
      name: 'transactionDetail',
      component: TransactionDetail,
      path: '/account/transactionDetail',
      alias: 'transactionDetail'
    }, {
      name: 'order',
      component: Order,
      path: '/order/list',
      alias: 'order'
    }, {
      name: 'logger',
      component: Logger,
      path: '/logger/list',
      alias: 'logger'
    }, {
      name: 'systemMessage',
      component: SystemMessage,
      path: '/system/message',
      alias: 'systemMessage'
    }, {
      name: 'personnelList',
      component: PersonnelList,
      path: '/personnel/List',
      alias: 'personnelList'
    }]
  }]
})
