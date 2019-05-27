<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
           <el-input placeholder="请输入操作/IP/账户名...进行搜索" v-model="query.keyword" class="input-with-select" style="width:50%;">
              
                <el-button slot="append" @click="handleSearch" size="mini">搜索</el-button>

            </el-input>
            
        </div>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />列表</div>
        </div>
        <el-table style="margin-top:10px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading"  @selection-change="handleSelectionChange" fit highlight-current-row>
            <el-table-column type="index" tpye="" align="center" label='序号' width="55">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='账号名称'>
                <template slot-scope="scope">
                    {{scope.row.userName}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='IP'>
                <template slot-scope="scope">
                    {{scope.row.ip}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='操作'>
                <template slot-scope="scope">
                    {{scope.row.operate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作时间'>
                <template slot-scope="scope">
                    {{scope.row.operateAt}}
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
 getlogpage
} from "@/api/system";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  operate:'',
  ip:'',
  userName:'',
  m:''
};

export default {
  data() {
    return {
      list: null,
      total: null,
      parentTypeItems:[],
      query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
      stateItems:[
          {id:1,name:'有效'},
          {id:0,name:'无效'}
      ]
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    refreshCurrentData(){
        this.handleSearch();
    },

    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
      this.query.operate="like,"+this.query.keyword;
      this.query.ip="like,"+this.query.keyword;
      this.query.userName="like,"+this.query.keyword;
      this.query.m="or";
      getlogpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.logPage.list;
          this.total = response.data.logPage.totalRow;
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
     handleSelectionChange(val) {
        this.multipleSelection = val;
    },
  }
};
</script>

