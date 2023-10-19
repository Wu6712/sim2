import {deleteDishes, insertDish, updateDish} from "@/api/dish";

const actions = {

  // delete dishes
  deleteDishes(state, deleteData) {
    return new Promise((resolve, reject) => {
      deleteDishes(deleteData).then(response => {
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
  // insert dish
  insertDish(state, dishData) {
    return new Promise((resolve, reject) => {
      insertDish(dishData).then(response => {
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
  // update dish
  updateDish(state, dishData) {
    return new Promise((resolve, reject) => {
      updateDish(dishData).then(response => {
        console.log(response)

        if (response.code !== 200) {
          return reject('更新失败')
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
