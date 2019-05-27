import request from '@/utils/request'

//获取人员列表
export function getworker(params) {
    return request({
      url: '/rescue/worker', 
      method: 'get',
      params: params
    })
  }
//保存人员信息
  export function workersave(params) {
    return request({
        url: '/rescue/worker/save'+params, 
        method: 'post',
    })
}
//查看人员信息
export function workershow(params) {
    return request({
        url: '/rescue/worker/show',
        method: 'get',
        params:params
    })
}

//删除人员
export function deleteworker(params) {
  return request({
    url: '/rescue/worker/delete',
    method: 'get',
    params: params
  })
}
  //准备更新人员信息
  export function editworker(params) {
    return request({
      url: '/rescue/worker/edit',
      method: 'get',
      params: params
    })
}
  //更新人员信息
  export function updateworker(params) {
    return request({
      url: '/rescue/worker/update'+params,
      method: 'post'
    })
}


//---------------------------------------------------
//获取专家列表
export function getexpert(params) {
  return request({
    url: '/rescue/expert', 
    method: 'get',
    params: params
  })
}
//保存专家信息
export function expertsave(params) {
  return request({
      url: '/rescue/expert/save'+params, 
      method: 'post',
  })
}
//查看专家信息
export function expertshow(params) {
  return request({
      url: '/rescue/expert/show',
      method: 'get',
      params:params
  })
}

//删除专家
export function deleteexpert(params) {
return request({
  url: '/rescue/expert/delete',
  method: 'get',
  params: params
})
}
//准备更新专家信息
export function editexpert(params) {
  return request({
    url: '/rescue/expert/edit',
    method: 'get',
    params: params
  })
}
//更新专家信息
export function updateexpert(params) {
  return request({
    url: '/rescue/expert/update'+params,
    method: 'post'
  })
}
//------------------------------------------------------------------
//获取医护人员列表
export function getmedical(params) {
  return request({
    url: '/rescue/medical', 
    method: 'get',
    params: params
  })
}
//保存医护人员信息
export function medicalsave(params) {
  return request({
      url: '/rescue/medical/save'+params, 
      method: 'post',
  })
}
//查看医护人员信息
export function medicalshow(params) {
  return request({
      url: '/rescue/medical/show',
      method: 'get',
      params:params
  })
}

//删除医护人员
export function deletemedical(params) {
return request({
  url: '/rescue/medical/delete',
  method: 'get',
  params: params
})
}
//准备更新医护人员信息
export function editmedical(params) {
  return request({
    url: '/rescue/medical/edit',
    method: 'get',
    params: params
  })
}
//更新医护人员信息
export function updatemedical(params) {
  return request({
    url: '/rescue/medical/update'+params,
    method: 'post'
  })
}


//删除医护人员
export function countByField(params) {
  return request({
    url: '/rescue/worker/countByField',
    method: 'get',
    params: params
  })
  }



  