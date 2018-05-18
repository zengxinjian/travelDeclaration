/**
 *
 *  Created by youli on 2017/11/9
 *
 */
/*
const apiMethod = {

  // 报单人登录
  declarationUserLogin: { url: '/api/DeclarationUser/login', method: 'post' },

  // 报单人忘记密码
  declarationUserForgetPwd: { url: '/api/DeclarationUser/forgetPwd', method: 'post' },

  // 报单人修改密码
  declarationUserEditPwd: { url: '/api/DeclarationUser/editPwd', method: 'post' },

  // 根据银行卡号获取详情
  getBankCardInfoByNum: { url: '/api/common/getBankCardInfoByNum', method: 'get', hideLoading: true },

  // 产品列表
  getGoodList: { url: '/api/common/getGoodList', method: 'get' },

  getRechargeType: { url: '/api/common/getRechargeType', method: 'get', hideLoading: true },

  // 获取订单状态
  getOrderStatus: { url: '/api/common/getOrderStatus', method: 'get', hideFail: true },

  // 获取订单本月状态
  getCurrentMonthRec: { url: '/api/common/GetCurrentMonthRec', method: 'get', hideFail: true },

  // 根据报单人获取下单人列表
  getReceiveByDeclaration: { url: '/api/common/getReceiveByDeclaration', method: 'get' },

  // 报单人下单
  declarationUserAddOrder: { url: '/api/order/DeclarationUserAddOrder', method: 'post' },

  // 报单人登录
  declarationUserAddOrderBank: { url: '/api/order/DeclarationUserAddOrderBank', method: 'post' },

  // 下单人列表
  getReceiveByDeclarationId: { url: '/api/receive/GetReceiveByDeclarationId', method: 'get' },

  // 新增下单人验证码
  sendAddReceive: { url: '/api/common/sendAddReceive', method: 'post' },

  // 新增下单人
  addReceive: { url: '/api/receive/addReceive', method: 'post' },

  // 报单人的订单列表
  getOrderListByDeclarationUser: { url: '/api/order/GetOrderListByDeclarationUser', method: 'get' },

  // 报单人的订单详情
  getOrderDetailByDeclarationUser: {
    url: '/api/order/GetOrderDetailByDeclarationUser',
    method: 'get'
  },

  // 订单统计
  commonGetOrderStat: { url: '/api/order/CommonGetOrderStat', method: 'get' },

  declarationGetOrderStat: { url: '/api/DeclarationUser/DeclarationGetOrderStat', method: 'get' },

  userEditOrderOilNo: { url: '/api/order/userEditOrderOilNo', method: 'post' },
  // 修改油卡
  editOrderOilNo: { url: '/api/order/editOrderOilNo', method: 'post' },

  // 修改银行卡
  editOrderBankNo: { url: '/api/order/EditOrderBankNo', method: 'post' },

  // 转油卡
  adminOrderChangeTypeToRefuellingCard: { url: '/api/order/AdminOrderChangeTypeToRefuellingCard', method: 'post' },

  // 转银行卡
  adminOrderChangeTypeToBank: { url: '/api/order/AdminOrderChangeTypeToBank', method: 'post' },

  // 订单充值详情
  getRechargeInfoByOrderId: { url: '/api/RechargeInfo/GetRechargeInfoByOrderId', method: 'get' },

  // 获取出单告知
  getCompleteOrder: { url: '/api/order/GetCompleteOrder', method: 'get' },

  // 获取出单告知
  getCompleteOrder2: { url: '/api/order/GetCompleteOrder2', method: 'get' },

  // 管理员登录
  adminLogin: { url: '/api/Admin/login', method: 'post' },

  // 管理员修改密码
  adminEditLoginPwd: { url: '/api/order/adminEditLoginPwd', method: 'post' },

  // 订单列表
  adminOrderList: { url: '/api/Order/GetOrderList', method: 'get' },

  // 批量核单
  adminOrderAuditBatch: { url: '/api/order/AdminOrderAuditBatch', method: 'post' },

// 批量出单
  adminOrderCarryOut: { url: '/api/order/AdminOrderCarryOut', method: 'post' },

// 批量充值
  admminOrderRecharge: { url: '/api/order/admminOrderRecharge', method: 'post' },

  admminOrderRechargeBank: { url: '/api/order/admminOrderRechargeBank', method: 'post' },

// 失败，再次充值
  admminOrderRechargeError: { url: '/api/order/admminOrderRechargeError', method: 'post' },

// 管理员查看订单详情
  adminOrderDetail: { url: '/api/order/adminOrderDetail', method: 'get' },

// 管理员修改订单
  adminEditOrder: { url: '/api/order/adminEditOrder', method: 'post' },

// 管理员撤单
  adminCancelOrder: { url: '/api/order/adminCancelOrder', method: 'post' },

// 报单人列表
  adminGetDeclarationUserList: {
    url: '/api/DeclarationUser/adminGetDeclarationUserList',
    method: 'get'
  },

// 报单人详情
  adminGetDeclarationUserDetail: {
    url: '/api/DeclarationUser/adminGetDeclarationUserDetail',
    method: 'get'
  },

// 新增报单人
  adminAddDeclarationUser: { url: '/api/DeclarationUser/adminAddDeclarationUser', method: 'post' },

// 激活报单人
  adminActiveDeclarationUser: {
    url: '/api/DeclarationUser/adminActiveDeclarationUser',
    method: 'post'
  },

// 收单人列表
  adminGetReceiveList: { url: '/api/receive/adminGetReceiveList', method: 'get' },

  // 收单人详情
  adminGetReceiveById: { url: '/api/receive/adminGetReceiveById', method: 'get' },

  // 报单人转银行卡
  declarationUserOrderChangeTypeToBank: { url: '/api/order/DeclarationUserOrderChangeTypeToBank', method: 'post' },

  // 报单人转油卡
  declarationUserOrderChangeTypeToRefuellingCard: { url: '/api/order/DeclarationUserOrderChangeTypeToRefuellingCard', method: 'post' },

  // 报单人修改银行卡
  userEditOrderBankNo: { url: '/api/order/UserEditOrderBankNo', method: 'post' },

  // 银行卡充值列表
  getMergeBankOrder: { url: '/api/order/GetMergeBankOrder', method: 'get' },

  // 银行卡充值
  orderBankRechargeRequest: { url: '/api/order/OrderBankRechargeRequest', method: 'post' },

  // 查询客户排队情况
  getOrderByName: { url: '/api/order/GetOrderByName', method: 'get' },

  // 我的银行卡列表
  getMyBankList: { url: '/api/DeclarationUser/GetBankCardList', method: 'get' },

  // 新增银行卡
  addBankCard: { url: '/api/DeclarationUser/AddBankCard', method: 'post' },

  // 银行卡详情
  getBankCardById: { url: '/api/DeclarationUser/GetBankCardById', method: 'get' },

  // 银行卡详情
  deleteBankCard: { url: '/api/DeclarationUser/DeleteBankCard', method: 'post' },


  // 银行卡报单数量
  getHasOrderBankCount: { url: '/api/order/GetHasOrderBankCount', method: 'get' },

  // 提交新银行
  declarationUserAddOrderBankWithNum: { url: '/api/order/DeclarationUserAddOrderBankWithNum', method: 'post' }

};*/
const apiMethod={
  partnetUserLogin:{url:'/api/PartnetUser/PartnetUserLogin',method:'post'},
  orderSubmit:{url:'/api/PartnetUser/OrderSubmit',method:'post'},
  getGoodList:{url:'/api/PartnetUser/GetGoodList',method:'get'},
  partnetUserLoginOut:{url:'/api/PartnetUser/PartnetUserLoginOut',method:'post'},
  partnetUserUpdatePwd:{url:'/api/PartnetUser/PartnetUserUpdatePwd',method:'post'},
  orderList:{url:'/api/PartnetUser/GerOrderList',method:'get'},
  orderDetail:{url:'/api/PartnetUser/GetOrderDetail',method:'get'},
  getOrderStatus:{url:'/api/PartnetUser/GetOrderStatus',method:'get'},
  getRechargeStatus:{url:'/api/PartnetUser/GetRechargeStatus',method:'get'},
  gerOrderRechargeList:{url:'/api/PartnetUser/GetOrderRechargeList',method:'get'}
};
export default apiMethod;
