//计划管理api
import request from '@/utils/request'

//获取计划类型分页
export function getplanTypepage(params) {
    return request({
      url: '/rescue/planType', 
      method: 'get',
      params: params
    })
  }
  //保存计划类型
  export function saveplanType(params) {
    return request({
      url: '/rescue/planType/save'+params, 
      method: 'post'
    })
  }
  //准备编辑计划类型
  export function editplanType(params) {
    return request({
      url: '/rescue/planType/edit',
      method: 'get',
      params: params
    })
  }
  //更新计划类型
  export function updateplanType(params) {
    return request({
        url: '/rescue/planType/update'+params,
        method: 'post'
    })
  }
  //删除计划类型
  export function deleteplanType(params) {
  return request({
    url: '/rescue/planType/delete',
    method: 'get',
    params: params
  })
  }
  


  //获取计划分页
export function getplanpage(params) {
    return request({
      url: '/rescue/plan', 
      method: 'get',
      params: params
    })
  }

    //获取计划分页
export function getMyWillEndPlan(params) {
  return request({
    url: '/my/getMyWillEndPlan', 
    method: 'get',
    params: params
  })
}
 
  //保存计划
  export function saveplan(params) {
    return request({
      url: '/rescue/plan/save'+params, 
      method: 'post'
    })
  }
  //准备编辑计划
  export function editplan(params) {
    return request({
      url: '/rescue/plan/edit',
      method: 'get',
      params: params
    })
  }
  //更新计划
  export function updateplan(params) {
    return request({
        url: '/rescue/plan/update'+params,
        method: 'post'
    })
  }
  //删除计划
  export function deleteplan(params) {
  return request({
    url: '/rescue/plan/delete',
    method: 'get',
    params: params
  })
  }

