//系统管理api
import request from '@/utils/request'

//获取用户分页
export function getaccountpage(params) {
    return request({
      url: '/admin/account', 
      method: 'get',
      params: params
    })
  }
  //保存用户
  export function saveaccount(params) {
    return request({
      url: '/admin/account/save'+params, 
      method: 'post'
    })
  }
  //准备编辑用户
  export function editaccount(params) {
    return request({
      url: '/admin/account/edit',
      method: 'get',
      params: params
    })
  }
  //更新用户
  export function updateaccount(params) {
    return request({
        url: '/admin/account/update'+params,
        method: 'post'
    })
  }
  //删除用户
  export function deleteaccount(params) {
  return request({
    url: '/admin/account/delete',
    method: 'get',
    params: params
  })
  }
  
//-----------------------------------角色---------------------------

  //获取角色分页
export function getrolepage(params) {
    return request({
      url: '/admin/role', 
      method: 'get',
      params: params
    })
  }
  //保存角色
  export function saverole(params) {
    return request({
      url: '/admin/role/save'+params, 
      method: 'post'
    })
  }
  //准备编辑角色
  export function editrole(params) {
    return request({
      url: '/admin/role/edit',
      method: 'get',
      params: params
    })
  }
  //更新角色
  export function updaterole(params) {
    return request({
        url: '/admin/role/update'+params,
        method: 'post'
    })
  }
  export function addRole(params) {
    return request({
      url: '/admin/account/addRole',
      method: 'get',
      params: params
    })
  }
  export function assignRoles(params) {
    return request({
      url: '/admin/account/assignRoles',
      method: 'get',
      params: params
    })
  }
  
  
  //删除角色
  export function deleterole(params) {
  return request({
    url: '/admin/role/delete',
    method: 'get',
    params: params
  })
  }
    //获取菜单分页
export function getmenupage(params) {
  return request({
    url: '/rescue/menu', 
    method: 'get',
    params: params
  })
}
 

  //-------------------------------- 日志管理--------------------------

//获取日志
export function getlogpage(params) {
    return request({
      url: '/rescue/log', 
      method: 'get',
      params: params
    })
  }
//保存日志
export function savelog(params) {
    return request({
      url: '/rescue/log/save'+params, 
      method: 'post'
    })
  }
  //准备编辑日志
  export function editlog(params) {
    return request({
      url: '/rescue/log/edit',
      method: 'get',
      params: params
    })
  }
  //更新日志
  export function updatelog(params) {
    return request({
        url: '/rescue/log/update'+params,
        method: 'post'
    })
  }
  //删除日志
  export function deletelog(params) {
  return request({
    url: '/rescue/log/delete',
    method: 'get',
    params: params
  })
  }
  

  export function countByField() {
    return request({
      url: '/admin/account/getStat',
      method: 'get'
    })
    }
  
  
