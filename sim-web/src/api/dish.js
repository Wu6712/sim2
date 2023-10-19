import request from "@/utils/request";

export function getDishList(data) {
  return request({
    url: '/dish/list2',
    method: 'get',
    params: {
      pageNum: data.pageNum,
      pageSize: data.pageSize
    }
  })
}

export function getDishListByMenuId(menuId) {
  return request({
    url: '/dish/IdList',
    method: 'get',
    params: {
      id: menuId
    }
  })
}

export function deleteDishes(deleteData) {
  return request({
    url: `/dish/remove/batch/${deleteData}`,
    method: 'post',
  })
}

export function insertDish(fileData) {
  return request({
    url: '/dish/add',
    method: 'post',
    data: fileData,
  })
}

export function updateDish(dishData) {
  return request({
    url: '/dish/mod',
    method: 'post',
    data: JSON.stringify(dishData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
