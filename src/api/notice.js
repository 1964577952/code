import request from '@/utils/request'

export function getnotice(params) {
    return request({
      url: '/rescue/notice', 
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