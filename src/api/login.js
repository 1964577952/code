import request from '@/utils/request'

// export function loginByUsername(username, password) {
//   const data = {
//     username,
//     password
//   }
//   return request({
//     url: '/login/login',
//     method: 'post',
//     data
//   })
// }

export function loginByUsername(userName, password,captcha) {
  const params = "?userName="+userName+"&password="+password+"&captcha="+captcha
  return request({
    url: '/login/doLogin'+params,
    method: 'get',
  })
}

export function getUserInfo() {
  
  return request({
    url: '/my',
    method: 'get',
  })
}

export function updatepassword(params) {
  
  return request({
    url: '/my/updatePassword'+params,
    method: 'get',
  })
}



export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

// export function getUserInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getcaptcha() {
  return request({
    url: '/login/captcha', 
    method: 'get'
  })
}

