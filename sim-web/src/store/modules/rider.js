import { getRiderList, deleteRiders, updateRider, insertRider } from "@/api/rider";


const actions = {
  // get riderList
  getRiderList(state, data) {
    return new Promise((resolve, reject) => {
      getRiderList(data).then(response => {
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
  // delete rider
  deleteRiders(state, deleteData) {
    return new Promise((resolve, reject) => {
      deleteRiders(deleteData).then(response => {
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
  // update rider
  updateRider(state, formData) {
    return new Promise((resolve, reject) => {
      updateRider(formData).then(response => {

        if (response.code !== 200) {
          return reject(response.message)
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // insert rider
  insertRider(state, menuData) {
    return new Promise((resolve, reject) => {
      insertRider(menuData).then(response => {
        console.log(response)

        if (response.code !== 200) {
          return reject('添加失败')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  }


}

export default {
  namespaced: true,
  actions
}
