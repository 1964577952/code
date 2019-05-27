<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>

    <breadcrumb class="breadcrumb-container"/>
   
    <div class="right-menu">
     
      <template v-if="device!=='mobile'">
        <error-log class="errLog-container right-menu-item hover-effect"/>
      </template>
    
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img src="/static/img/timg.jpg" class="user-avatar">
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item >
              <span style="display:block;" @click="goIndex">{{ $t('navbar.dashboard') }}</span>
            </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="myInfo">个人信息 </span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="updatePassWord">修改密码 </span>
          </el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
     <div class="right-text">{{getNowFormatDate()}} {{username}},欢迎您</div>
      <info ref="info"  ></info>    
      <password ref="password"  ></password>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import info from "./info";
import password from "./password";
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import ThemePicker from '@/components/ThemePicker'
import Search from '@/components/HeaderSearch'
import { getNowFormatDate } from "@/utils/common";

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    ThemePicker,
    Search,
    info,
    password
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
   data() {

    return {
      username: this.$store.getters.username, //弹出页面控制
    };
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    goIndex() {
      this.$router.push({ path: '/dashboard'})
    },
    myInfo(){
           this.$refs.info.showData();
    },
    updatePassWord(){
        this.$refs.password.showData();
    },
    getNowFormatDate: function() {
      return getNowFormatDate();
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  background-color: RGBA(34, 52, 94, 1);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
 

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
 .right-text {
  float: right;
    height: 100%;
    line-height: 50px;
    font-size:16px;
font-family:MicrosoftYaHei;
font-weight:400;
color: white;
padding-right: 20px;
 }
  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
      border-radius:70%; height: 40px; overflow:hidden;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
