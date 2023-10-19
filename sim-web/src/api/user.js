import request from '@/utils/request'

export function login(userInfo) {
  return request({
    url: `${sessionStorage.getItem('role') === 'admin' ? '/simple-user/login' : '/rider/login'}`,
    method: 'post',
    params: {
      username: userInfo.username,
      password: userInfo.password
    }
  })
}

export function register(data) {
  return request({
    url: '/simple-user/register',
    method: 'post',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function riderRegister(data) {
  return request({
    url: '/rider/register',
    method: 'post',
    params: {
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo() {
  let role = sessionStorage.getItem('role')
  return request({
    url: `${role === 'admin' ? '/simple-user' : 'rider'}`,
    method: 'get',
  })
}

export function getRiderInfo() {
  return request({
    url: '/rider',
    method: 'get',
  })
}

export function getUserList() {
  return request({
    url: '/simple-user/list2',
    method: 'get'
  })
}

export function logout(id) {
  let role = sessionStorage.getItem('role')
  return request({
    url: `${role === 'admin' ? '/simple-user/logout' : 'rider/logout'}`,
    method: 'post',
    params: {
      id: id
    }
  })
}

export function getListByName(data) {
  return request({
    url: '/simple-user/fuzzyList',
    method: 'post',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      username: data.username
    }
  })
}

export function deleteUsers(deleteData) {
  return request({
    url: `/simple-user/remove/batch/${deleteData}`,
    method: 'post',
  })
}

export function updateUser(formData) {
  return request({
    url: '/simple-user/save',
    method: 'post',
    data: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
