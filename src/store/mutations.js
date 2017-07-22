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
// /////////////////////////////////////////////////////

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
// /////////////////////////////////////////////////////

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
// /////////////////////////////////////////////////////

// ///////////////////////应用商店数据//////////////////////////////
export const initApplicationTplData = (state, index, row) => {
  state.appStoreData.appList = []
  axios({
    method: 'GET',
    url: 'http://localhost:30000/cloud/window/v1/application_tpl/list',
    params: {
      access_token: localStorage.getItem('positionAccessToken')
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
// /////////////////////////////////////////////////////

export const increment = state => {
  state.count = state.count + 5
}

export const decrement = state => {
  state.count = state.count - 3
}

export const ADD_TOTAL_TIME = (state, time) => {
  state.totalTime = parseFloat(state.totalTime) + parseFloat(time)
}

export const DEC_TOTAL_TIME = (state, time) => {
  state.totalTime = state.totalTime - time
}

export const SAVE_PLAN = (state, plan) => {
  const avatar = 'https://sfault-avatar.b0.upaiyun.com/147/223/147223148-573297d0913c5_huge256'
  state.list.push(
    Object.assign({name: '二哲', avatar: avatar}, plan)
  )
}

export const DELETE_PLAN = (state, idx) => {
  state.list.splice(idx, 1)
}

export const handleDetail = (state, index, row) => {
  console.log('handleDetail')
  console.log(index, row)
}
export const handleEdit = (state, index, row) => {
  console.log('handleEdit')
  console.log(index, row)
}
export const handleDelete = (state, index, row) => {
  console.log('handleDelete')
  console.log(index, row)
}
export const handleSelectionChange = (state, index, row) => {
  console.log('handleSelectionChange')
  console.log(index, row)
}
// 上一页 下一页
export const handleSizeChange = (state, index, row) => {
  console.log('handleSizeChange')
  console.log(index, row)
}
export const handleCurrentChange = (state, index, row) => {
  console.log('handleCurrentChange')
  console.log(index, row)
}
