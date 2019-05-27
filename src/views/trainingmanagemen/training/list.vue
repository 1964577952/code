<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
            <el-form label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="训练类别">
                            <el-select  v-model="query.typeId"   style="width:220px;" >
                                <el-option label="选择训练类别" value=""></el-option>
                              <el-option
                                v-for="item in parentTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="训练开始时间">
                             <el-date-picker
                            v-model="query.startTimeArray"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="开始时间"
                            end-placeholder="结束时间" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            value-format ="yyyy-MM-dd HH:mm:ss" 
                            align="right">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4" align="left">
                        <el-form-item label="" label-width="0px">
                            <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                        </el-form-item>

                    </el-col>
                </el-row>
            </el-form>
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
            <el-table-column align="center" label='训练类别'>
                <template slot-scope="scope">
                    {{scope.row.drilltype}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='训练时长'>
              <template slot-scope="scope" style="">
                    {{scope.row.duration}}
                </template>
            </el-table-column>
             <el-table-column align="left" label='训练开始时间' width="150">
              <template slot-scope="scope" style="">
                    {{scope.row.startTime}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='应到人数'>
              <template slot-scope="scope" style="">
                    {{scope.row.should}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='实到人数'>
              <template slot-scope="scope" style="">
                    {{scope.row.actual}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='缺席人'>
              <template slot-scope="scope" style="">
                    {{scope.row.absent}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='备注'>
              <template slot-scope="scope" style="">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='操作' width="200">
                <template slot-scope="scope">
                    <el-button type="primary"  plain size="mini" @click="handleedit(scope.row)">编辑</el-button>
                    <el-button type="primary"  plain size="mini" @click="handleDelRow(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
       
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.p" :page-sizes="[10,20,30, 50]" :page-size="query.ps" layout="total,sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <add ref="add"  @refreshCurrentData='refreshCurrentData'></add>
        <edit ref="edit"  @refreshCurrentData='refreshCurrentData'></edit>
    </div>
</template>




<script>
import {
 getdrilltypepage,
 getdrillpage,
 deletedrill,
 findtree
} from "@/api/training";
 
 import  add  from "./add";
 import edit from "./edit";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  startTimeArray:[],
  typeId:''
};

export default {
components: {
   add,
   edit
  },
  data() {
    return {
      list: null,
      total: null,
      parentTypeItems:[],
      query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
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
    this.getdrilltypeItems();
    this.getPageList();
  },
  methods: {
    
 
    handleedit(row){
        this.$refs.edit.showData(row.id);
    },
    
    refreshCurrentData(){
        this.handleSearch();
    },

    getdrilltypeItems(){
       findtree({findType:'listallleaf'})
        .then(response => {
          this.parentTypeItems =   response.data;;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
      getdrillpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.drillPage.list;
          this.total = response.data.drillPage.totalRow;
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
      if(this.query.startTimeArray.length>1){
          this.query.startTime="between,'"+this.query.startTimeArray[0]+"',"+this.query.startTimeArray[1];
      }else{
         this.query.startTime='';
      }
     
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
                      deletedrill({ids: val.id})
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
                      deletedrill({ids: ids})
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

