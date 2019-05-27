
  //办公自动化api
  import request from '@/utils/request'


  //水印分页
  export function getwatermarkpage(params) {
    return request({
      url: '/rescue/watermark', 
      method: 'get',
      params: params
    })
  }
  //保存水印
  export function savewatermark(params) {
    return request({
      url: '/rescue/watermark/save'+params, 
      method: 'post'
    })
  }
  //准备水印
  export function editwatermark(params) {
    return request({
      url: '/rescue/watermark/edit',
      method: 'get',
      params: params
    })
  }

  //更新水印
  export function updatewatermark(params) {
    return request({
        url: '/rescue/watermark/update'+params,
        method: 'post'
    })
  }
  //删除水印
  export function deletewatermark(params) {
  return request({
    url: '/rescue/watermark/delete',
    method: 'get',
    params: params
  })
  }


  //公文分页
  export function getofficeDocumentpage(params) {
    return request({
      url: '/rescue/officeDocument', 
      method: 'get',
      params: params
    })
  }
  //保存公文
  export function saveofficeDocument(params) {
    return request({
      url: '/rescue/officeDocument/save'+params, 
      method: 'post'
    })
  }
  //准备编辑公文
  export function editofficeDocument(params) {
    return request({
      url: '/rescue/officeDocument/edit',
      method: 'get',
      params: params
    })
  }

  //更新公文
  export function updateofficeDocument(params) {
    return request({
        url: '/rescue/officeDocument/update'+params,
        method: 'post'
    })
  }
  
  //删除公文
  export function deleteofficeDocument(params) {
  return request({
    url: '/rescue/officeDocument/delete',
    method: 'get',
    params: params
  })
  }
  export function getReceived(params) {
    return request({
      url: '/rescue/officeDocument/getReceived',
      method: 'get',
      params: params
    })
    }
  
    export function getReceivednotice(params) {
      return request({
        url: '/rescue/notice/getReceived',
        method: 'get',
        params: params
      })
      }
    //通知公告分页
    export function getnoticepage(params) {
        return request({
          url: '/rescue/notice', 
          method: 'get',
          params: params
        })
      }
      //保存通知公告
      export function savenotice(params) {
        return request({
          url: '/rescue/notice/save'+params, 
          method: 'post'
        })
      }
      //准备编辑通知公告
      export function editnotice(params) {
        return request({
          url: '/rescue/notice/edit',
          method: 'get',
          params: params
        })
      }
    
      //更新通知公告
      export function updatenotice(params) {
        return request({
            url: '/rescue/notice/update'+params,
            method: 'post'
        })
      }
      //删除通知公告
      export function deletenotice(params) {
      return request({
        url: '/rescue/notice/delete',
        method: 'get',
        params: params
      })
      }

    