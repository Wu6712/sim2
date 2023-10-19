import request from '@/utils/request'

export function getRiderList(data) {
  return request({
    url: '/rider/list',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function deleteRiders(deleteData) {
  return request({
    url: `/rider/remove/batch/${deleteData}`,
    method: 'post',
  })
}

export function getListByName(data) {
  return request({
    url: '/rider/fuzzyList',
    method: 'post',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      username: data.username
    }
  })
}

export function updateRider(formData) {
  return request({
    url: '/rider/save',
    method: 'post',
    data: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function insertRider(formData) {
  return request({
    url: '/rider/add',
    method: 'post',
    data: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
