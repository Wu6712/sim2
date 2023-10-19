import request from "@/utils/request";

export function getOrderList(data) {
  return request({
    url: '/order/list2',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function insertOrder(formData) {
  return request({
    url: '/order/add',
    method: 'post',
    data: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function deleteOrders(deleteData) {
  return request({
    url: `/order/remove/batch/${deleteData}`,
    method: 'post',
  })
}

export function updateOrder(orderData) {
  return request({
    url: '/order/mod',
    method: 'post',
    data: JSON.stringify(orderData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
