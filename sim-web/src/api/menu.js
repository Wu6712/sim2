import request from "@/utils/request";

export function getMenuList(data) {
  return request({
    url: '/menu/list',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function deleteMenus(deleteData) {
  return request({
    url: `/menu/remove/batch/${deleteData}`,
    method: 'post',
  })
}


export function insertMenu(menuData) {
  return request({
    url: '/menu/add',
    method: 'post',
    data: JSON.stringify(menuData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function updateMenuById(menuData) {
  return request({
    url: '/menu/mod',
    method: 'post',
    data: JSON.stringify(menuData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
