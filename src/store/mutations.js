import axios from 'axios'
import router from '.././router'

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
export const initMyInfoData = (state, index, row) => {
  axios({
    method: 'get',
    url: 'http://localhost:30000/cloud/window/v1/user/detail',
    params: {
      access_token: localStorage.getItem('positionAccessToken')
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
  axios({
    method: 'get',
    url: 'http://localhost:30000/cloud/window/v1/company/detail',
    params: {
      access_token: localStorage.getItem('positionAccessToken')
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.id = response.data.data.id
      index.logo = response.data.data.logo
      index.name = response.data.data.name
      index.short_name = response.data.data.short_name
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
  state.appCenterData.list = []
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/application/list',
    params: {
      access_token: localStorage.getItem('positionAccessToken'),
      page_size: index.pageSize,
      current: index.current,
      name: index.appSeek
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.PageSize
      index.current = response.data.data.Current
      index.total = response.data.data.Total
      state.appCenterData.list = response.data.data.List
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////应用商店数据//////////////////////////////
export const initApplicationTplData = (state, index, row) => {
  state.appStoreData.appList = []
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/application_tpl/list',
    params: {
      access_token: localStorage.getItem('positionAccessToken'),
      name: index.appSeek,
      type: index.appType
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      state.appStoreData.appList = response.data.data.List
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////账户统计数据//////////////////////////////
export const initAccountData = (state, index, row) => {
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/account/accountstatistics',
    params: {
      access_token: localStorage.getItem('positionAccessToken')
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
  state.appStoreData.appList = []
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/account_item/list',
    params: {
      access_token: localStorage.getItem('positionAccessToken'),
      page_size: index.pageSize,
      current: index.current,
      date: ''
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.PageSize
      index.current = response.data.data.Current
      index.total = response.data.data.Total
      state.appStoreData.appList = response.data.data.List
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////交易明细列表数据//////////////////////////////
export const initTransactionDetailListData = (state, index, row) => {
  state.loggerData.list = []
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/account_item/tradinglist',
    params: {
      access_token: localStorage.getItem('positionAccessToken'),
      page_size: index.pageSize,
      current: index.current,
      start_date: index.startTime,
      end_date: index.endTime
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.PageSize
      index.current = response.data.data.Current
      index.total = response.data.data.Total
      state.loggerData.list = response.data.data.List
    }
  }).catch(function (error) {
    console.log(error)
  })
}

// ///////////////////////操作记录数据//////////////////////////////
export const initLoggerListData = (state, index, row) => {
  state.loggerData.list = []
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/logger/list',
    params: {
      access_token: localStorage.getItem('positionAccessToken'),
      page_size: index.pageSize,
      current: index.current,
      date: ''
    }
  }).then(function (response) {
    console.log(response.data)
    if (response.data.code === '200') {
      index.pageSize = response.data.data.PageSize
      index.current = response.data.data.Current
      index.total = response.data.data.Total
      state.loggerData.list = response.data.data.List
    }
  }).catch(function (error) {
    console.log(error)
  })
}
