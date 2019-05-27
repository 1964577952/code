  //资料管理api
import request from '@/utils/request'
  
  //资料类型分页
  export function getdataTypepage(params) {
    return request({
      url: '/rescue/dataType', 
      method: 'get',
      params: params
    })
  }
  //保存资料类型
  export function savedataType(params) {
    return request({
      url: '/rescue/dataType/save'+params, 
      method: 'post'
    })
  }
  //准备编辑资料类型
  export function editdataType(params) {
    return request({
      url: '/rescue/dataType/edit',
      method: 'get',
      params: params
    })
  }

  //更新资料类型
  export function updatedataType(params) {
    return request({
        url: '/rescue/dataType/update'+params,
        method: 'post'
    })
  }
  //删除资料类型
  export function deletedataType(params) {
  return request({
    url: '/rescue/dataType/delete',
    method: 'get',
    params: params
  })
  }

    //获取资料类型树
    export function findtree(params) {
      return request({
        url: '/rescue/dataType/findtree',
        method: 'get',
        params: params
      })
    }


    //资料分页
    export function getdatapage(params) {
        return request({
          url: '/rescue/data', 
          method: 'get',
          params: params
        })
      }
      //保存资料
      export function savedata(params) {
        return request({
          url: '/rescue/data/save'+params, 
          method: 'post'
        })
      }
      //准备编辑资料
      export function editdata(params) {
        return request({
          url: '/rescue/data/edit',
          method: 'get',
          params: params
        })
      }
    
      //更新资料
      export function updatedata(params) {
        return request({
            url: '/rescue/data/update'+params,
            method: 'post'
        })
      }
      //删除资料
      export function deletedata(params) {
      return request({
        url: '/rescue/data/delete',
        method: 'get',
        params: params
      })
      }