//应急值班管理api
import request from '@/utils/request'

//获取值班分页
export function getdutypage(params) {
    return request({
      url: '/rescue/duty', 
      method: 'get',
      params: params
    })
  }
  //保存值班
  export function saveduty(params) {
    return request({
      url: '/rescue/duty/save'+params, 
      method: 'post'
    })
  }
  //准备编辑值班
  export function editduty(params) {
    return request({
      url: '/rescue/duty/edit',
      method: 'get',
      params: params
    })
  }
  //更新值班
  export function updateduty(params) {
    return request({
        url: '/rescue/duty/update'+params,
        method: 'post'
    })
  }
  //删除值班
  export function deleteduty(params) {
  return request({
    url: '/rescue/duty/delete',
    method: 'get',
    params: params
  })
  }


//获取值班日志分页
export function getdutyLogpage(params) {
    return request({
      url: '/rescue/dutyLog', 
      method: 'get',
      params: params
    })
  }
  //保存值班日志
  export function savedutyLog(params) {
    return request({
      url: '/rescue/dutyLog/save'+params, 
      method: 'post'
    })
  }
  //准备编辑值班日志
  export function editdutyLog(params) {
    return request({
      url: '/rescue/dutyLog/edit',
      method: 'get',
      params: params
    })
  }

  //更新值班日志
  export function updatedutyLog(params) {
    return request({
        url: '/rescue/dutyLog/update'+params,
        method: 'post'
    })
  }
  //删除值班日志
  export function deletedutyLog(params) {
  return request({
    url: '/rescue/dutyLog/delete',
    method: 'get',
    params: params
  })
  }


  //获取预防性检查分页
export function getprecheckpage(params) {
    return request({
      url: '/rescue/precheck', 
      method: 'get',
      params: params
    })
  }
  //保存预防检查
  export function saveprecheck(params) {
    return request({
      url: '/rescue/precheck/save'+params, 
      method: 'post'
    })
  }
  //准备编辑预防检查
  export function editprecheck(params) {
    return request({
      url: '/rescue/precheck/edit',
      method: 'get',
      params: params
    })
  }

  //更新预防检查
  export function updateprecheck(params) {
    return request({
        url: '/rescue/precheck/update'+params,
        method: 'post'
    })
  }
  //删除预防检查
  export function deleteprecheck(params) {
  return request({
    url: '/rescue/precheck/delete',
    method: 'get',
    params: params
  })
  }


  
  //获取接警登记分页
export function getalarmLogpage(params) {
    return request({
      url: '/rescue/alarmLog', 
      method: 'get',
      params: params
    })
  }
  //保存接警登记
  export function savealarmLog(params) {
    return request({
      url: '/rescue/alarmLog/save'+params, 
      method: 'post'
    })
  }
  //准备编辑接警登记
  export function editalarmLog(params) {
    return request({
      url: '/rescue/alarmLog/edit',
      method: 'get',
      params: params
    })
  }

  //更新接警登记
  export function updatealarmLog(params) {
    return request({
        url: '/rescue/alarmLog/update'+params,
        method: 'post'
    })
  }
  //删除接警登记
  export function deletealarmLog(params) {
  return request({
    url: '/rescue/alarmLog/delete',
    method: 'get',
    params: params
  })
  }


  export function countByField(params) {
    return request({
      url: '/rescue/alarmLog/countByField',
      method: 'get',
      params: params
    })
    }

  

  