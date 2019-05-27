<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
             <el-input placeholder="请输值班班组/值班人员...进行搜索" v-model="query.keyword" class="input-with-select" style="width:50%;">
                <el-button slot="append" @click="handleSearch" size="mini">搜索</el-button>
            </el-input>
        </div>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />列表</div>
              <div style="float:right;padding-right:20px;">
                <el-button type="primary"  plain size="mini" @click="handleAdd">新增</el-button>
                <el-button type="primary"  plain size="mini" @click="handleDel">批量删除</el-button>
            </div>
        </div>
        <el-table style="margin-top:10px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading"  @selection-change="handleSelectionChange" fit highlight-current-row>
             <el-table-column
            type="selection"
            width="55"></el-table-column>
            <el-table-column type="index" tpye="" align="center" label='序号' width="55">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='值班单位'>
                <template slot-scope="scope">
                    {{scope.row.unitname}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='值班班组'>
                <template slot-scope="scope">
                    {{scope.row.team}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='值班人员'>
                <template slot-scope="scope">
                    {{scope.row.person}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='操作' width="440">
                <template slot-scope="scope">
                    <el-button type="primary"  plain size="mini" @click="handleedit(scope.row)">编辑</el-button>
                    <el-button type="primary"  plain size="mini" @click="handleDelRow(scope.row)">删除</el-button>
                    <el-button type="primary"  plain size="mini" @click="handleddlog(scope.row)">添加值班记录</el-button>
                    <el-button type="primary"  plain size="mini" @click="handledetaillog(scope.row)">查看值班记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
       
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.p" :page-sizes="[10,20,30, 50]" :page-size="query.ps" layout="total,sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>   
         <add ref="add"  @refreshCurrentData='refreshCurrentData'></add>    
        <edit ref="edit"  @refreshCurrentData='refreshCurrentData'></edit>
        <addlog ref="addlog" @refreshCurrentData='refreshCurrentData'></addlog>
        <detaillog  ref="detaillog" @refreshCurrentData='refreshCurrentData'></detaillog>
    </div>
</template>




<script>
import {
 getdutypage,
 deleteduty
} from "@/api/emergencyduty";
 import add from "./add";
 import edit from "./edit";
 import addlog from "./addlog";
 import detaillog from "./detaillog";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  team:'',
  m:'',
  person:''
};

export default {
components: {
   add,
   edit,
   addlog,
   detaillog
  },
  data() {
    return {
      list: null,
      total: null,
      query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
      teamItems:[
          {id:'早班(08:00-16:00)',name:'早班(08:00-16:00)'},
          {id:'晚班(16:00-00:00)',name:'晚班(16:00-00:00)'},
          {id:'夜班(00:00-08:00)',name:'夜班(00:00-08:00)'},
      ],
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    handleedit(row){
        this.$refs.edit.showData(row.id);
    },
    handleddlog(row){
       this.$refs.addlog.showData(row.id);
    },
    handledetaillog(row){
      this.$refs.detaillog.showData(row.id);
    },
    refreshCurrentData(){
        this.handleSearch();
    },
    
    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
     this.query.team="like,"+this.query.keyword;
     this.query.person ="like,"+this.query.keyword;
     this.query.m="or";
      getdutypage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.dutyPage.list;
          this.total = response.data.dutyPage.totalRow;
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
     handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    handleDelRow(val){
           this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                      deleteduty({ids: val.id})
                        .then(response => {
                            Message({
                            message: "删除成功",
                            type: "success"
                            });
                            this.handleSearch();
                        })
                        .catch(err => {
                        this.listLoading = false;
                        console.log(err);
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });  
    },
    handleDel(){
        const ids=this.getIds();
           if(ids==''){
              Message({
              message: "请选择要删除的列",
              type: "error"
              });
              return;
           }
           this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                      deleteduty({ids: ids})
                        .then(response => {
                            Message({
                            message: "删除成功",
                            type: "success"
                            });
                            this.handleSearch();
                        })
                        .catch(err => {
                        this.listLoading = false;
                        console.log(err);
                        });
                    }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
    },
     //获取需要操作的数据集合
    getIds() {
        var Ids = [];
        if (this.multipleSelection.length > 0) {
            for (var i = 0; i < this.multipleSelection.length; i++) {
            Ids.push(this.multipleSelection[i].id);
            }
        }
        return Ids.join(',');
    },
  }
};
</script>

