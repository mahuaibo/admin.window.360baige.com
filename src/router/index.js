import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Login from '@/components/admin/Login'
import Register from '@/components/admin/Register'
import BindAccount from '@/components/admin/BindAccount'
import Info from '@/components/admin/Info'
import ModifyPwd from '@/components/admin/ModifyPwd'
import CompanyInfo from '@/components/company/Info'
import AppCenter from '@/components/application/AppCenter'
import AppStore from '@/components/application/AppStore'
import AppTplDetail from '@/components/application/AppTplDetail'
import Account from '@/components/account/Account'
import TransactionDetail from '@/components/account/TransactionDetail'
import Order from '@/components/order/Order'
import Logger from '@/components/logger/Logger'
import DialogLogin from '@/components/admin/DialogLogin'

Vue.use(Router)

export default new Router({
  routes: [{
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
    name: 'bindAccount',
    component: BindAccount,
    path: '/admin/bindAccount',
    alias: 'bindAccount'
  }, {
    name: 'dialogLogin',
    component: DialogLogin,
    path: '/admin/dialogLogin',
    alias: 'dialogLogin'
  }, {
    name: 'home',
    component: Home,
    path: '/home',
    alias: '',
    children: [{
      name: 'myInfo',
      component: Info,
      path: '/admin/info',
      alias: 'myInfo'
    }, {
      name: 'modifyPassword',
      component: ModifyPwd,
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
      name: 'appTplDetail',
      component: AppTplDetail,
      path: '/application/appTplDetail',
      alias: 'appTplDetail'
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
    }]
  }]
})
