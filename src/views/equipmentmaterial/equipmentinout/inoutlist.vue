<template>
    <div class="app-container aside-container" >
         <el-tabs v-model="activeName"  type="card"  @tab-click="handleClick">
            <el-tab-pane label="出库" name="first"></el-tab-pane>
            <el-tab-pane label="入库" name="second"></el-tab-pane>
        </el-tabs>
      
     
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />列表</div>
        </div>
        <el-table style="margin-top:10px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading"   fit highlight-current-row>
           
            <el-table-column type="index" tpye="" align="center" label='序号' width="55">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='装备物资名称'>
                <template slot-scope="scope">
                    {{scope.row.equipmentname}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='申请人'>
                <template slot-scope="scope">
                    {{scope.row.userName}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='数量'>
                <template slot-scope="scope">
                    {{scope.row.quantity}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='厂家'>
                <template slot-scope="scope">
                    {{scope.row.factory}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='出入库时间'>
                <template slot-scope="scope">
                    {{scope.row.inoutAt}}
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.p" :page-sizes="[10,20,30, 50]" :page-size="query.ps" layout="total,sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>   
    </div>
</template>




<script>
import {
 getequipmentInOutpage,
} from "@/api/equipmentmaterial";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  equipmentId:0,
  inout:0,
};

export default {
  data() {
    return {
      activeName: 'first',
      list: null,
      total: null,
      query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
      id:0,
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    handleClick(tab, event) {
      if(this.activeName=="first"){
          this.query.inout=0;
      }
      if(this.activeName=="second"){
          this.query.inout=1;
      }
       this.handleSearch();
    },
    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      console.log(this.$route.query.id);
      this.query.equipmentId = this.$route.query.id;
      //根据查询条件获取分页数据
      getequipmentInOutpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.equipmentInOutPage.list;
          this.total = response.data.equipmentInOutPage.totalRow;
          //关闭load
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
          console.log(err);
        });
    },
    //页码变化重新加载列表
    handleSizeChange(val) {
      this.query.ps = val;
      this.getPageList();
    },
    //当前页变化重新加载列表
    handleCurrentChange(val) {
      this.query.p = val;
      this.getPageList();
    },
    //查询
    handleSearch() {
      this.query.p = 1;
      this.getPageList();
    },
    handleAdd(){
        this.$refs.add.showData();
    },


  }
};
</script>

