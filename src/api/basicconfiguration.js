//基础管理api
import request from '@/utils/request'

  //获取单位部门列表
  export function getunitpage(params) {
    return request({
      url: '/rescue/unit', 
      method: 'get',
      params: params
    })
  }
  //保存单位
export function saveunit(params) {
    return request({
      url: '/rescue/unit/save'+params, 
      method: 'post'
    })
  }
//准备保存单位
export function editunit(params) {
    return request({
      url: '/rescue/unit/edit',
      method: 'get',
      params: params
    })
}
//更新单位
export function updateunit(params) {
    return request({
        url: '/rescue/unit/update'+params,
        method: 'post'
    })
}
//删除单位
export function deleteunit(params) {
  return request({
    url: '/rescue/unit/delete',
    method: 'get',
    params: params
  })
}

//获取单位树
export function findtree(params) {
  return request({
    url: '/rescue/unit/findtree',
    method: 'get',
    params: params
  })
}



  //获取事故类型列表
  export function getaccidentTypepage(params) {
    return request({
      url: '/rescue/accidentType', 
      method: 'get',
      params: params
    })
  }
  //保存事故类型
export function saveaccidentType(params) {
    return request({
      url: '/rescue/accidentType/save'+params, 
      method: 'post'
    })
  }
//准备保存事故类型
export function editaccidentType(params) {
    return request({
      url: '/rescue/accidentType/edit',
      method: 'get',
      params: params
    })
}
//更新事故类型
export function updateaccidentType(params) {
    return request({
        url: '/rescue/accidentType/update'+params,
        method: 'post'
    })
}
//删除事故类型
export function deleteaccidentType(params) {
  return request({
    url: '/rescue/accidentType/delete',
    method: 'get',
    params: params
  })
}



 //获取重点企业列表
 export function getenterprisepage(params) {
  return request({
    url: '/rescue/enterprise', 
    method: 'get',
    params: params
  })
}
//保存重点企业
export function saveenterprise(params) {
  return request({
    url: '/rescue/enterprise/save'+params, 
    method: 'post'
  })
}
//准备编辑重点企业
export function editenterprise(params) {
  return request({
    url: '/rescue/enterprise/edit',
    method: 'get',
    params: params
  })
}
//更新重点企业
export function updateenterprise(params) {
  return request({
      url: '/rescue/enterprise/update'+params,
      method: 'post'
  })
}
//删除重点企业
export function deleteenterprise(params) {
return request({
  url: '/rescue/enterprise/delete',
  method: 'get',
  params: params
})
}




