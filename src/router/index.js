import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'home', noCache: true, affix: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/basicconfiguration',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'basicconfiguration',
    meta: {
      title: '基础配置',
      icon: 'jichupeizhi',
      roles:'basicconfiguration'
    },
    children: [
      {
        path: 'unitmanagement/list',
        component: () => import('@/views/basicconfiguration/unitmanagement/list'),
        name: 'unitmanagementlist',
        meta: { title: '单位部门管理',roles:'unitmanagementlist' }
        
      },
      {
        path: 'enterprisemanagement/list',
        component: () => import('@/views/basicconfiguration/enterprisemanagement/list'),
        name: 'enterprisemanagementlist',
        meta: { title: '重点企业管理' ,roles:'enterprisemanagementlist'}
       
      },
      {
        path: 'incidenttypemanagement/list',
        component: () => import('@/views/basicconfiguration/incidenttypemanagement/list'),
        name: 'incidenttypemanagementlist',
        meta: { title: '事故类型管理',roles:'incidenttypemanagementlist' }
      
      }
    ]
  },
  
  {
    path: '/systemmanagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'systemmanagement',
    meta: {
      title: '系统管理',
      icon: 'component',
      roles:'systemmanagement'
    },
    children: [
      {
        path: 'rolemanagement/list',
        component: () => import('@/views/systemmanagement/rolemanagement/list'),
        name: 'rolemanagementlist',
        meta: { title: '角色管理' , roles:'rolemanagementlist'}
        
      },
     
      {
        path: 'accountmanagement/list',
        component: () => import('@/views/systemmanagement/accountmanagement/list'),
        name: 'accountmanagementlist',
        meta: { title: '账号管理', roles:'accountmanagementlist' }
       
      },
      
      {
        path: 'systemlog/list',
        component: () => import('@/views/systemmanagement/systemlog/list'),
        name: 'systemloglist',
        meta: { title: '系统日志管理', roles:'systemloglist' }
      
      },
      {
        path: 'accountmanagement/statistical',
        component: () => import('@/views/systemmanagement/accountmanagement/statistical'),
        name: 'accountmanagementstatistical',
        meta: { title: '账号信息统计',  name: 'accountmanagementstatistical',}
       
      },
    ]
  },
  {
    path: '/rescueteams',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'rescueteams',
    meta: {
      title: '救援队伍',
      icon: 'jydw',
      roles:'rescueteams'
    },
    children: [
      {
        path: 'personnelmanagement/list',
        component: () => import('@/views/rescueteams/personnelmanagement/list'),
        name: 'personnelmanagementlist',
        meta: { title: '人员管理',roles:'personnelmanagementlist' }
        
      },
      
      {
        path: 'expertmanagement/list',
        component: () => import('@/views/rescueteams/expertmanagement/list'),
        name: 'expertmanagementlist',
        meta: { title: '专家管理' ,roles:'expertmanagementlist'}
       
      },
      
      {
        path: 'medicalteammanagement/list',
        component: () => import('@/views/rescueteams/medicalteammanagement/list'),
        name: 'medicalteammanagementlist', 
        meta: { title: '医疗队伍管理',roles:'medicalteammanagementlist' }
      
      },
      {
        path: 'personnelmanagement/statistical',
        component: () => import('@/views/rescueteams/personnelmanagement/statistical'),
        name: 'personnelmanagementstatistical',
        meta: { title: '账号信息统计' ,roles:'personnelmanagementstatistical'}
        
      },
      
    ]
  },
  { 
    path: '/equipmentmaterial',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'equipmentmaterial',
    meta: {
      title: '装备物资',
      icon: 'zbwz',
      roles:'equipmentmaterial'
    },
    children: [
      {
        path: 'equipmentmaterialtype/list',
        component: () => import('@/views/equipmentmaterial/equipmentmaterialtype/list'),
        name: 'equipmentmaterialtypelist',
        meta: { title: '装备物资类型',roles:'equipmentmaterialtypelist' }
        
      },
      {
        path: 'equipmentmaterial/list',
        component: () => import('@/views/equipmentmaterial/equipmentmaterial/list'),
        name: 'equipmentmateriallist',
        meta: { title: '装备物资管理',roles:'equipmentmateriallist' }
        
      },
      {
        path: 'storage/list',
        component: () => import('@/views/equipmentmaterial/storage/list'),
        name: 'storagelist',
        meta: { title: '库房管理',roles:'storagelist' }
        
      },
      {
        path: 'equipmentinout/list',
        component: () => import('@/views/equipmentmaterial/equipmentinout/list'),
        name: 'equipmentinoutlist',
        meta: { title: '出入库管理' ,roles:'equipmentinoutlist'}
        
      },
      {
        path: 'equipmentinout/inoutlist',
        component: () => import('@/views/equipmentmaterial/equipmentinout/inoutlist'),
        name: 'equipmentinouthistorylist',
        meta: { title: '出入库历史记录' },
        hidden: true
        
      },
      {
        path: 'equipmentMaintenance/list',
        component: () => import('@/views/equipmentmaterial/equipmentMaintenance/list'),
        name: 'equipmentMaintenancelist',
        meta: { title: '装备维保管理',roles:'equipmentMaintenancelist' }
        
      },
      {
        path: 'equipmentmaterial/statistical',
        component: () => import('@/views/equipmentmaterial/equipmentmaterial/statistical'),
        name: 'equipmentmaterialstatistical',
        meta: { title: '装备物资统计',roles:'equipmentmaterialstatistical' }
        
      },
      
    ]
  },
  {
    path: '/programmanagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'planmanagement',
    meta: {
      title: '计划管理',
      icon: 'jhgl',
      roles:'planmanagement'
    },
    children: [
      {
        path: 'planningcategory/list',
        component: () => import('@/views/planmanagement/planningcategory/list'),
        name: 'planningcategorylist',
        meta: { title: '计划类别管理' ,roles:'planningcategorylist'}
        
      },
      {
        path: 'planning/list',
        component: () => import('@/views/planmanagement/planning/list'),
        name: 'planninglist',
        meta: { title: '计划管理',roles:'planninglist' }
       
      }
    ]
  },
  {
    path: '/trainingmanagemen',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'trainingmanagemen',
    meta: {
      title: '培训训练管理',
      icon: 'pxxl',
      roles:'trainingmanagemen' 
    },
    children: [
      {
        path: 'trainingcategory/list',
        component: () => import('@/views/trainingmanagemen/trainingcategory/list'),
        name: 'trainingcategorylist',
        meta: { title: '训练类别管理',roles:'trainingcategorylist' }
        
      },
      {
        path: 'training/list',
        component: () => import('@/views/trainingmanagemen/training/list'),
        name: 'traininglist',
        meta: { title: '训练管理' ,roles:'traininglist'}
        
      },
      {
        path: 'train/list',
        component: () => import('@/views/trainingmanagemen/train/list'),
        name: 'trainlist',
        meta: { title: '培训管理',roles:'trainlist' }
        
      },
      {
        path: 'statistical',
        component: () => import('@/views/trainingmanagemen/statistical'),
        name: 'trainstatistical',
        meta: { title: '培训信息统计',roles:'trainstatistical' }
        
      }
      
    ]
  },
  {
    path: '/emergencyduty',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'emergencyduty',
    meta: {
      title: '应急值班管理',
      icon: 'yjzb',
      roles:'emergencyduty'
    },
    children: [
      {
        path: 'dutyLog/list',
        component: () => import('@/views/emergencyduty/dutyLog/list'),
        name: 'dutyLoglist',
        meta: { title: '值班日志管理',roles:'dutyLoglist' }
        
      },
      {
        path: 'precheck/list',
        component: () => import('@/views/emergencyduty/precheck/list'),
        name: 'prechecklist',
        meta: { title: '预防性检查管理',roles:'prechecklist' }
        
      },
      {
        path: 'alarmLog/list',
        component: () => import('@/views/emergencyduty/alarmLog/list'),
        name: 'alarmLoglist',
        meta: { title: '接警登记管理',roles:'alarmLoglist'  }
        
      },

      {
        path: 'alarmLog/statistical',
        component: () => import('@/views/emergencyduty/alarmLog/statistical'),
        name: 'alarmLogstatistical',
        meta: { title: '接警信息统计'  ,roles:'alarmLogstatistical'}
        
      }
      
    ]
  },
  {
    path: '/rescueplans',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'rescueplans',
    meta: {
      title: '救援行动预案',
      icon: 'jyxd',
      roles:'rescueplans'
    },
    children: [
      {
        path: 'rescuecase/list',
        component: () => import('@/views/rescueplans/rescuecase/list'),
        name: 'rescuecaselist',
        meta: { title: '案例管理',roles:'rescuecaselist' }
        
      },
      {
        path: 'rescueplan/list',
        component: () => import('@/views/rescueplans/rescueplan/list'),
        name: 'rescueplanlist',
        meta: { title: '预案管理',roles:'rescuecaselist' }
        
      }
      
    ] 
  },
  {
    path: '/datamanagement',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'datamanagement',
    meta: {
      title: '资料管理',
      icon: 'zl',
      roles:'datamanagement'
    },
    children: [
      {
        path: 'datatype/list',
        component: () => import('@/views/datamanagement/datatype/list'),
        name: 'datatypelist',
        meta: { title: '资料类型管理', roles:'datatypelist' }
        
      },
      {
        path: 'data/list',
        component: () => import('@/views/datamanagement/data/list'),
        name: 'datalist',
        meta: { title: '资料管理' , roles:'datalist'}
        
      }
      
    ]
  },
  {
    path: '/officeautomation',
    component: Layout,
    redirect: 'noredirect',
    alwaysShow: true,
    name: 'officeautomation',
    meta: {
      title: '办公自动化',
      icon: 'bgzdh',
       roles:'officeautomation'
    },
    children: [
      {
        path: 'watermark/list',
        component: () => import('@/views/officeautomation/watermark/list'),
        name: 'watermarklist',
        meta: { title: '水印管理', roles:'watermarklist' }
        
      },
      {
        path: 'officedocument/list',
        component: () => import('@/views/officeautomation/officedocument/list'),
        name: 'officedocumentlist',
        meta: { title: '公文管理' , roles:'officedocumentlist'}
        
      },
      {
        path: 'notice/list',
        component: () => import('@/views/officeautomation/notice/list'),
        name: 'noticelist',
        meta: { title: '通知公告', roles:'noticelist' }
        
      }
      
    ]
  },








  

  { path: '*', redirect: '/404', hidden: true }
]
