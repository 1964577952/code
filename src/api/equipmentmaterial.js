//装备物资api
import request from '@/utils/request'

    //装备材料类型分页
    export function getequipmentTypepage(params) {
        return request({
          url: '/rescue/equipmentType', 
          method: 'get',
          params: params
        })
      }
      //保存装备材料类型
      export function saveequipmentType(params) {
        return request({
          url: '/rescue/equipmentType/save'+params, 
          method: 'post'
        })
      }
      //准备编辑装备材料类型
      export function editequipmentType(params) {
        return request({
          url: '/rescue/equipmentType/edit',
          method: 'get',
          params: params
        })
      }
    
      //更新装备材料类型
      export function updateequipmentType(params) {
        return request({
            url: '/rescue/equipmentType/update'+params,
            method: 'post'
        })
      }
      //删除装备材料类型
      export function deleteequipmentType(params) {
      return request({
        url: '/rescue/equipmentType/delete',
        method: 'get',
        params: params
      })
      }
    //获取装备材料树
    export function findtree(params) {
      return request({
        url: '/rescue/equipmentType/findtree',
        method: 'get',
        params: params
      })
    }
      //----------------------------------------------

          //装备材料分页
    export function getequipmentpage(params) {
        return request({
          url: '/rescue/equipment', 
          method: 'get',
          params: params
        })
      }
      //保存装备材料
      export function saveequipment(params) {
        return request({
          url: '/rescue/equipment/save'+params, 
          method: 'post'
        })
      }
      //准备编辑装备材料
      export function editequipment(params) {
        return request({
          url: '/rescue/equipment/edit',
          method: 'get',
          params: params
        })
      }
      //查看装备材料
      export function showequipment(params) {
        return request({
          url: '/rescue/equipment/show',
          method: 'get',
          params: params
        })
      }
    
      //更新装备材料
      export function updateequipment(params) {
        return request({
            url: '/rescue/equipment/update'+params,
            method: 'post'
        })
      }
      //删除装备材料
      export function deleteequipment(params) {
      return request({
        url: '/rescue/equipment/delete',
        method: 'get',
        params: params
      })
      }

      //------------------------------------------------------------

//库房分页
    export function getstoragepage(params) {
        return request({
          url: '/rescue/storage', 
          method: 'get',
          params: params
        })
      }
      //保存库房
      export function savestorage(params) {
        return request({
          url: '/rescue/storage/save'+params, 
          method: 'post'
        })
      }
      //准备编辑库房
      export function editstorage(params) {
        return request({
          url: '/rescue/storage/edit',
          method: 'get',
          params: params
        })
      }
    
      //更新库房
      export function updatestorage(params) {
        return request({
            url: '/rescue/storage/update'+params,
            method: 'post'
        })
      }
      //删除库房
      export function deletestorage(params) {
      return request({
        url: '/rescue/storage/delete',
        method: 'get',
        params: params
      })
      }
      
      //------------------------------------------------------------

      //出入库记录分页
    export function getequipmentInOutpage(params) {
        return request({
          url: '/rescue/equipmentInOut', 
          method: 'get',
          params: params
        })
      }
      //保存出入库记录
      export function saveequipmentInOut(params) {
        return request({
          url: '/rescue/equipmentInOut/save'+params, 
          method: 'post'
        })
      }
      //准备编辑出入库记录
      export function editequipmentInOut(params) {
        return request({
          url: '/rescue/equipmentInOut/edit',
          method: 'get',
          params: params
        })
      }
    
      //更新出入库记录
      export function updateequipmentInOut(params) {
        return request({
            url: '/rescue/equipmentInOut/update'+params,
            method: 'post'
        })
      }
      //删除出入库记录
      export function deleteequipmentInOut(params) {
      return request({
        url: '/rescue/equipmentInOut/delete',
        method: 'get',
        params: params
      })
      }
      export function getStock(params) {
        return request({
          url: '/rescue/equipmentInOut/getStock', 
          method: 'get',
          params: params
        })
      }
      

      //-----------------------装备维保记录------------------------
           //装备维保信息分页
    export function getequipmentMaintenancepage(params) {
      return request({
        url: '/rescue/equipmentMaintenance', 
        method: 'get',
        params: params
      })
    }
    //保存出装备维保信息
    export function saveequipmentMaintenance(params) {
      return request({
        url: '/rescue/equipmentMaintenance/save'+params, 
        method: 'post'
      })
    }
    //准备编辑装备维保信息
    export function editequipmentMaintenance(params) {
      return request({
        url: '/rescue/equipmentMaintenance/edit',
        method: 'get',
        params: params
      })
    }
  
    //更新装备维保信息
    export function updateequipmentMaintenance(params) {
      return request({
          url: '/rescue/equipmentMaintenance/update'+params,
          method: 'post'
      })
    }
    //删除装备维保信息
    export function deleteequipmentMaintenance(params) {
    return request({
      url: '/rescue/equipmentMaintenance/delete',
      method: 'get',
      params: params
    })
    }


    export function countByField(params) {
      return request({
        url: '/rescue/equipmentInOut/countByType',
        method: 'get',
        params: params
      })
      }
    