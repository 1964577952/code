import { loginByUsername, logout, getUserInfo } from '@/api/login'
import {
   assignRoles
  } from "@/api/system";
  import { Message } from "element-ui";
import { getToken, setToken, removeToken ,getCurrent,setCurrent,removeCurrent} from '@/utils/auth'
import { fail } from 'assert';

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    userName:'',
    unitName:'',
    unitId:0,
    sessionId:'',
  },

  mutations: {
    SET_SESSIONID: (state, sessionId) => {
      state.sessionId = sessionId
    },
    SET_UNITNAME: (state, unitname) => {
      state.unitName = unitname
    },
    SET_UNITID: (state, unitId) => {
      state.unitId = unitId
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USERNAME:(state,userName) => {
      state.userName = userName
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const userName = userInfo.username.trim()
      const password = userInfo.password.trim()
      const captcha = userInfo.captcha.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userName, password,captcha).then(response => {
          if(response.data.state){
            if(response.data.state == "ok") {
              setToken(response.data.RescueId)
            }
          }
         
           resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
       
      
      
       // if(getCurrent() == undefined){
            getUserInfo().then(response => {
              console.log(response.data);
            //  if(response.data.state =='fail'){
           
                
             // }

              setCurrent(response.data)
           
              commit('SET_TOKEN', getToken())
              var current = JSON.parse(getCurrent())
              commit('SET_NAME',current.account.nickName)
              commit('SET_AVATAR',current.account.avatar)
              commit('SET_USERNAME',current.account.userName)
              commit('SET_SESSIONID',current.account.sessionId)
              if(current.worker != null){
                commit('SET_UNITNAME',current.worker.unitname)
                
                commit('SET_UNITID',current.worker.unitId)
              }
              assignRoles({id:current.account.id})
              .then(response => {
              
              
                   commit('SET_ROLES',  response.data.roleList[0].menu.split(','))
                   resolve()
              }).catch(err => {
                resolve()
                console.log(err);
              });
             
            }).catch(error => {
              reject(error)
            })
           
           
        // }
        //  else{
        
         
        //    commit('SET_TOKEN', getToken())
        //    var current = JSON.parse(getCurrent())
          
        //    commit('SET_NAME',current.account.nickName)
        //    commit('SET_AVATAR',current.account.avatar)
        //    commit('SET_USERNAME',current.account.userName)
        //    commit('SET_SESSIONID',current.account.sessionId)
        //    if(current.worker != null){
        //     commit('SET_UNITNAME',current.worker.unitname)
        //     commit('SET_UNITID',current.worker.unitId)
        //   }
        
        //    assignRoles({id:current.account.id})
        //     .then(response => {
        //          commit('SET_ROLES',  response.data.roleList[0].menu.split(','))
        //          resolve()
        //     }).catch(err => {
        //       resolve()
        //       console.log(err);
        //     });
           
        //  }
     
    
  
       
       
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeCurrent()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeCurrent()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
