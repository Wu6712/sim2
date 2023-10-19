import {getOrderList, insertOrder, updateOrder, deleteOrders} from "@/api/order";

const actions = {

  // get orderList
  getOrderList(state, data) {
    return new Promise((resolve, reject) => {
      getOrderList(data).then(response => {
        console.log(response)

        if (response.code !== 200) {
          return reject('获取菜单数据失败')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // insert order
  insertOrder(state, orderData) {
    return new Promise((resolve, reject) => {
      insertOrder(orderData).then(response => {
        console.log(response)

        if (response.code !== 200) {
          return reject('添加失败')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // update order
  updateOrder(state, orderData) {
    return new Promise((resolve, reject) => {
      updateOrder(orderData).then(response => {
        console.log(response)

        if (response.code !== 200) {
          return reject('更新失败')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // delete orders
  deleteOrders(state, orderData) {
    return new Promise((resolve, reject) => {
      deleteOrders(orderData).then(response => {
        console.log('delete dish....')
        console.log(response)
        if (response.code !== 200) {
          return reject("删除失败")
        }
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

export default {
  namespaced: true,
  actions
}
