import axios from 'axios'
import router from '.././router'

// /////////////////////////////accessToken验证////////////////
function verifyLoginAccessToken() {
  if (localStorage.getItem('accessToken') === null) {
    router.push('/admin/login')
  }
  return
}

// /////////////////////////////跳转页面/////////////////////////////
export const handleClick = (state, index, row) => {
  console.log('handleClick')
  if (typeof index === 'string') {
    router.push(index)
  } else {
    router.push(index.name)
  }
}

// ///////////////////////我的信息数据//////////////////////////////
export const initHomeData = (state, index, row) => {
  verifyLoginAccessToken()
}

// ///////////////////////用户角色//////////////////////////////
export const getUserPositionList = (state, index, row) => {
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/userPosition/list',
    params: {
      accessTicket: localStorage.getItem('accessTicket')
    }
  }).then(function (response) {
    console.log(response.data.data)
    if (response.data.code === '200') {
      state.userPositionList.list = []
      state.userPositionList.list = response.data.data
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////我的信息数据//////////////////////////////
export const initMyInfoData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/user/detail',
    params: {
      accessToken: localStorage.getItem('accessToken')
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.id = response.data.data.id
      index.username = response.data.data.username
      index.phone = response.data.data.phone
      index.email = response.data.data.email
    } else {

    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////企业信息数据//////////////////////////////
export const initCompanyInfoData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/company/detail',
    params: {
      accessToken: localStorage.getItem('accessToken')
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.id = response.data.data.id
      index.logo = response.data.data.logo
      index.name = response.data.data.name
      index.short_name = response.data.data.shortName
      index.address = response.data.data.address
      index.brief = response.data.data.brief
      index.remark = response.data.data.remark
    } else {

    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////应用管理数据//////////////////////////////
export const initApplicationData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/application/list',
    params: {
      accessToken: localStorage.getItem('accessToken'),
      pageSize: index.pageSize,
      current: index.current,
      name: index.appSeek
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      state.appCenterData.list = []
      state.appCenterData.list = response.data.data.list
      index.pageSize = response.data.data.pageSize
      index.current = response.data.data.current
      index.total = response.data.data.total
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////应用商店数据//////////////////////////////
export const initApplicationTplData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/applicationTpl/list',
    params: {
      accessToken: localStorage.getItem('accessToken'),
      name: index.appSeek,
      type: index.appType
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      state.appStoreData.appList = []
      state.appStoreData.appList = response.data.data.list
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////账户统计数据//////////////////////////////
export const initAccountData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/account/accountStatistics',
    params: {
      accessToken: localStorage.getItem('accessToken')
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.balance = response.data.data.balance
      index.TotalEntry = response.data.data.total_entry
      index.TotalDischarge = response.data.data.total_discharge
      index.MonthIncome = response.data.data.month_income
      index.MonthPay = response.data.data.month_pay
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////账户列表数据//////////////////////////////
export const initAccountListData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/accountItem/list',
    params: {
      accessToken: localStorage.getItem('accessToken'),
      pageSize: index.pageSize,
      current: index.current,
      date: ''
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.pageSize
      index.current = response.data.data.current
      index.total = response.data.data.total
      state.accountData.appList = []
      state.accountData.list = response.data.data.list
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////交易明细列表数据//////////////////////////////
export const initTransactionDetailListData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/accountItem/tradinglist',
    params: {
      accessToken: localStorage.getItem('accessToken'),
      pageSize: index.pageSize,
      current: index.current,
      startDate: index.startTime,
      endDate: index.endTime
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.PageSize
      index.current = response.data.data.Current
      index.total = response.data.data.Total
      state.transactionDetailData.list = []
      state.transactionDetailData.list = response.data.data.list
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////订单列表数据//////////////////////////////
export const initOrderListData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/order/list',
    params: {
      accessToken: localStorage.getItem('accessToken'),
      pageSize: index.pageSize,
      current: index.current,
      status: index.status
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.pageSize
      index.current = response.data.data.current
      index.total = response.data.data.total
      state.orderData.list = []
      state.orderData.list = response.data.data.list
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////操作记录数据//////////////////////////////
export const initLoggerListData = (state, index, row) => {
  verifyLoginAccessToken()
  axios({
    method: 'POST',
    url: state.publicParameters.domain + '/logger/list',
    params: {
      accessToken: localStorage.getItem('accessToken'),
      pageSize: index.pageSize,
      current: index.current,
      date: ''
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.pageSize
      index.current = response.data.data.current
      index.total = response.data.data.total
      state.loggerData.list = []
      state.loggerData.list = response.data.data.list
    }
  }).catch(function (error) {
    console.log(error)
  })
}
