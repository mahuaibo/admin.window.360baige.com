// 公共参数
export const getUserPositionList = ({commit}, index, row) => commit('getUserPositionList', index, row)
// 跳转页面
export const handleClick = ({commit}, index, row) => commit('handleClick', index, row)
// 首页数据
export const initHomeData = ({commit}, index, row) => commit('initHomeData', index, row)
// 我的信息数据
export const initInfoData = ({commit}, index, row) => commit('initInfoData', index, row)
// 企业信息数据
export const initCompanyInfoData = ({commit}, index, row) => commit('initCompanyInfoData', index, row)
// 应用管理数据
export const initApplicationData = ({commit}, index, row) => commit('initApplicationData', index, row)
// 应用商店数据
export const initApplicationTplData = ({commit}, index, row) => commit('initApplicationTplData', index, row)
// 账户统计数据
export const initAccountData = ({commit}, index, row) => commit('initAccountData', index, row)
// 账户统计数据
export const initAccountListData = ({commit}, index, row) => commit('initAccountListData', index, row)
// 操作记录列表数据
export const initLoggerListData = ({commit}, index, row) => commit('initLoggerListData', index, row)
// 操作记录列表数据
export const initTransactionDetailListData = ({commit}, index, row) => commit('initTransactionDetailListData', index, row)
// 操作记录列表数据
export const initOrderListData = ({commit}, index, row) => commit('initOrderListData', index, row)

