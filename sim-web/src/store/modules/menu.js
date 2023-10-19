import { getMenuList, deleteMenus, insertMenu } from "@/api/menu";

const actions = {
  // get menuList
  getMenuList(state, data) {
    return new Promise((resolve, reject) => {
      getMenuList(data).then(response => {

        if (response.code !== 200) {
          return reject('获取菜单数据失败')
        }

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // delete menus
  deleteMenus(state, deleteData) {
    return new Promise((resolve, reject) => {
      deleteMenus(deleteData).then(response => {
        console.log('delete menus....')
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
  // insert menu
  insertMenu(state, menuData) {
    return new Promise((resolve, reject) => {
      insertMenu(menuData).then(response => {
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
