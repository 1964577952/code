//救援预案api
import request from '@/utils/request'

//保存案例信息
export function saverescueCase(params) {
    return request({
      url: '/rescue/rescueCase/save'+params, 
      method: 'post'
    })
  }

  //获取案例分页列表
export function getrescueCasepage(params) {
    return request({
      url: '/rescue/rescueCase', 
      method: 'get',
      params: params
    })
  }

//删除案例列表
export function deleterescueCase(params) {
    return request({
      url: '/rescue/rescueCase/delete',
      method: 'get',
      params: params
    })
  }

  //准备更新案例信息
export function editrescueCase(params) {
    return request({
      url: '/rescue/rescueCase/edit',
      method: 'get',
      params: params
    })
}
  //更新案例信息
  export function updaterescueCase(params) {
    return request({
      url: '/rescue/rescueCase/update'+params,
      method: 'post'
    })
}


//保存预案信息
export function saverescuePlan(params) {
    return request({
      url: '/rescue/rescuePlan/save'+params, 
      method: 'post'
    })
  }

  //获取预案分页列表
export function getrescuePlanpage(params) {
    return request({
      url: '/rescue/rescuePlan', 
      method: 'get',
      params: params
    })
  }

//删除预案列表
export function deleterescuePlan(params) {
    return request({
      url: '/rescue/rescuePlan/delete',
      method: 'get',
      params: params
    })
  }

  //准备更新预案信息
export function editrescuePlan(params) {
    return request({
      url: '/rescue/rescuePlan/edit',
      method: 'get',
      params: params
    })
}
  //更新预案信息
  export function updaterescuePlan(params) {
    return request({
      url: '/rescue/rescuePlan/update'+params,
      method: 'post'
    })
}
