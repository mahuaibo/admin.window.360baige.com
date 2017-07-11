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

// ///////////////////////应用管理数据//////////////////////////////
export const initApplicationData = (state, index, row) => {
  state.applicationListData.list = []
  axios({
    method: 'POST',
    url: 'http://localhost:9090/developer/app/getAppList',
    params: {page: index.page, rows: index.rows, type: index.dataType}
  }).then(function (response) {
    if (response.data) {
      state.applicationListData.list = response.data
      axios({
        method: 'POST',
        url: 'http://localhost:9090/developer/app/getAppCount',
        params: {type: index.dataType}
      }).then(function (response) {
        if (response.data) {
          state.applicationListData.total = response.data
        }
      }).catch(function (error) {
        console.log(error)
      })
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
