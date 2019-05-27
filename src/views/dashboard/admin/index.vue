<template>
  <div class="dashboard-editor-container">

  <div class="description">
    <div>
        <div class="avatar-wrapper">
          <img src="/static/img/timg.jpg" style="height: 60px;" >
        </div>
        <div>
           <p class="indextitle">Hello，{{username}}，欢迎进入救护队应急救援管理系统！</p>
        </div>
    </div>
  </div>

    <el-row :gutter="8" >
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <Announcements/>
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 12}" :xl="{span: 12}" style="margin-bottom:30px;">
        <message/>
      </el-col>
    
    </el-row>

  </div>
</template>

<script>

import Announcements from './components/Announcements'
import message from './components/message'

import TransactionTable from './components/TransactionTable'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'
import Mallki from '@/components/TextHoverEffect/Mallki'


export default {
  name: 'DashboardAdmin',
  components: {
    TransactionTable,
    TodoList,
    BoxCard,
    Mallki,
    Announcements,
    message
  },
  data() {
    return {
      username: this.$store.getters.username
    }
  },
  methods: {
   
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-editor-container {
  padding: 25px;
  background-color: rgb(240, 242, 245);
}
 .avatar-wrapper {
    float: left;border-radius:70%; height: 60px; overflow:hidden;

      
  }
  .description {
    padding: 20px;
    box-sizing: border-box;
    border: 1px solid #ebebeb;
    border-radius: 3px;
    font-size: 14px;
    line-height: 22px;
    color: #666;
    word-break: break-word;
    margin-bottom: 10px;
    background-color: #fff;
    height: 100px;
}
.indextitle{
  font-size:18px;
font-family:PingFangSC-Regular;
font-weight:400;
color:rgba(51,51,51,1);
float: left;
padding-left: 30px;
}
</style>
