<template>
<div>
<div class="tabletitle">
    <div>
        <svg-icon icon-class="tabcol" />待办提醒</div>
</div>
  <el-table :data="list"   class="indextable">
    <el-table-column label="标题" min-width="200">
      <template slot-scope="scope">
        <span style="color:rgba(0, 110, 255, 1)"  @click="handledetail(scope.row)">
          {{ scope.row.title }}
          </span>
      </template>
    </el-table-column>
  
    <el-table-column label="计划开始时间" width="200" align="center">
      <template slot-scope="scope">
        {{ scope.row.startDate }}
      </template>
    </el-table-column>
  </el-table>
   <messageDetail ref="messageDetail"  ></messageDetail>
  </div>
</template>

<script>
 import messageDetail from "./messageDetail";
import {
 getMyWillEndPlan,
} from "@/api/plan";
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
    messageDetail
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
      this.$refs.messageDetail.showData(row.id);
  },
    fetchData() {
      getMyWillEndPlan({
        ps: 20,
        p:1,
      }).then(response => {
        this.list = response.data.plan.list;
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
 
