export const increment = ({commit}) => commit('increment')
export const decrement = ({commit}) => commit('decrement')
export const handleClick = ({commit}, index, row) => commit('handleClick', index, row)
export const handleDetail = ({commit}, index, row) => commit('handleDetail', index, row)
export const handleEdit = ({commit}, index, row) => commit('handleEdit', index, row)
export const handleDelete = ({commit}, index, row) => commit('handleDelete', index, row)
export const handleSelectionChange = ({commit}, index, row) => commit('handleSelectionChange', index, row)
export const handleSizeChange = ({commit}, index, row) => commit('handleSizeChange', index, row)
export const handleCurrentChange = ({commit}, index, row) => commit('handleCurrentChange', index, row)

// 应用管理数据
export const initApplicationData = ({commit}, index, row) => commit('initApplicationData', index, row)

