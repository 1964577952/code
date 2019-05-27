<template>
<div>
<div class="tabletitle">
    <div>
        <svg-icon icon-class="tabcol" />通知公告</div>
</div>
  <el-table :data="list"   class="indextable">
    <el-table-column label="标题" min-width="200">
      <template slot-scope="scope" >
        <span style="color:rgba(0, 110, 255, 1)"  @click="handledetail(scope.row)">
          {{ scope.row.title }}
          </span>
        
      </template>
    </el-table-column>
  
    <el-table-column label="发布时间" width="100" align="center">
      <template slot-scope="scope">
        {{ scope.row.createAt }}
      </template>
    </el-table-column>
  </el-table>
    <noticeDatail ref="noticeDatail"  ></noticeDatail>
  </div>
</template>

<script>
import { getReceivednotice } from '@/api/notice'
 import noticeDatail from "./noticeDatail";

const defaultData={
    accountId:0,
    receiverId:0,
    remark:null,
    id:1,
    type:0,
    title:"",
    content:"",
    createAt:""
};
export default {
components: {
    noticeDatail
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.fetchData()
  },
  
  methods: {
    handledetail(row){
      this.$refs.noticeDatail.showData(row.id);
  },
    fetchData() {
      getReceivednotice({
        keyword: '',
        ps: 20,
        p:1,
      }).then(response => {
        this.list = response.data.noticePage.list;
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
 .indextable{
  width: 100%;padding-top: 15px;
 height:45vh ;
 height: -webkit-calc(100vh - 350px); /*对应Chrome和Safari浏览器*/
  height: -moz-calc(100vh - 350px); /*对应FireFox浏览器*/
  height: calc(100vh - 350px);
  
}
</style>
 
