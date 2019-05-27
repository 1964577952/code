import request from '@/utils/request'
//培训管理api

//保存日常培训计划类别
export function savedrilltype(params) {
    return request({
      url: '/rescue/drillType/save'+params, 
      method: 'post'
    })
  }

  //获取日常培训计划类别列表
export function getdrilltypepage(params) {
    return request({
      url: '/rescue/drillType', 
      method: 'get',
      params: params
    })
  }

//删除日常培训计划类别
export function deletedrilltype(params) {
    return request({
      url: '/rescue/drillType/delete',
      method: 'get',
      params: params
    })
  }

  //准备更新日常培训计划类别
export function editdrilltype(params) {
    return request({
      url: '/rescue/drillType/edit',
      method: 'get',
      params: params
    })
}
  //更新日常培训计划类别
  export function updatedrilltype(params) {
    return request({
      url: '/rescue/drillType/update'+params,
      method: 'post'
    })
}

//获取计划类别树
export function findtree(params) {
  return request({
    url: '/rescue/drillType/findtree',
    method: 'get',
    params: params
  })
}


//保存训练

export function savedrill(params) {
  return request({
    url: '/rescue/drill/save'+params, 
    method: 'post'
  })
}

//训练列表
  export function getdrillpage(params) {
    return request({
      url: '/rescue/drill', 
      method: 'get',
      params: params
    })
  }
  //删除日常培训计划
export function deletedrill(params) {
  return request({
    url: '/rescue/drill/delete',
    method: 'get',
    params: params
  })
}

  //准备更新日常培训计划
  export function editdrill(params) {
    return request({
      url: '/rescue/drill/edit',
      method: 'get',
      params: params
    })
}
  //更新日常培训计划
  export function updatedrill(params) {
    return request({
      url: '/rescue/drill/update'+params,
      method: 'post'
    })
}

//获取培训列表
export function gettrainpage(params) {
  return request({
    url: '/rescue/train', 
    method: 'get',
    params: params
  })
}

//保存培训
export function savetrain(params) {
  return request({
    url: '/rescue/train/save'+params, 
    method: 'post'
  })
}

  //准备更新培训
  export function edittrain(params) {
    return request({
      url: '/rescue/train/edit',
      method: 'get',
      params: params
    })
}
  //更新培训
  export function updatetrain(params) {
    return request({
      url: '/rescue/train/update'+params,
      method: 'post'
    })
}

  //查询培训信息
  export function showtrain(params) {
    return request({
      url: '/rescue/train/show',
      method: 'get',
      params: params
    })
}


  export function deletetrain(params) {
    return request({
      url: '/rescue/train/delete',
      method: 'get',
      params: params
    })
}


//保存培训记录
export function savetrainrecord(params) {
  return request({
    url: '/rescue/trainRecord/save'+params, 
    method: 'post'
  })
}


//获取培训记录列表
export function gettrainrecordpage(params) {
  return request({
    url: '/rescue/trainRecord', 
    method: 'get',
    params: params
  })
}


    //培训管理统计
    export function countByField(params) {
      return request({
        url: '/rescue/train/countByField',
        method: 'get',
        params: params
      })
      }