import
{
  login, getInfo, register, riderRegister, logout, deleteUsers, updateUser
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    id: '',
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password.trim() }).then(response => {
        const { data } = response
        console.log('userLogin res......')
        console.log(data)
        commit('SET_NAME', username)
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user register
  register(state, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      register({ username: username.trim(), password: password}).then(response => {
        console.log(response)

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // rider register
  riderRegister(state, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      riderRegister({ username: username.trim(), password: password}).then(response => {
        console.log(response)

        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        console.log('userInfo...')
        console.log(response)
        const { data } = response
        console.log(data)

        if (!data) {
          return reject('验证失败，请重新登录')
        }

        commit('SET_NAME', data.username)
        commit('SET_ID', data.id)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      logout(state.id).then(response => {
        console.log('logout...')
        console.log(response)
      })
      removeToken()
      resetRouter()
      commit('RESET_STATE')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },
  // delete users
  deleteUsers(state, deleteData) {
    return new Promise((resolve, reject) => {
      deleteUsers(deleteData).then(response => {
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
  // update user
  updateUser(state, formData) {
    return new Promise((resolve, reject) => {
      updateUser(formData).then(response => {

        if (response.code !== 200) {
          return reject(response.message)
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
  state,
  mutations,
  actions
}

