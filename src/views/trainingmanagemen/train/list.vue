<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
            <el-form label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="办班年份">
                             <el-date-picker
                                v-model="query.year"
                                type="year"
                                  format="yyyy-MM-dd" 
                                 value-format ="yyyy-MM-dd" 
                                placeholder="选择年份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="办班期次">
                            <el-input v-model="query.periods" placeholder="请输入办班期次"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="center">
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
            <el-table-column align="center" label='办班年份'>
                <template slot-scope="scope">
                    {{scope.row.year}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='办班期次'>
              <template slot-scope="scope" style="">
                    {{scope.row.periods}}
                </template>
            </el-table-column>
             <el-table-column align="left" label='办班单位'>
              <template slot-scope="scope" style="">
                    {{scope.row.company}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='联系人'>
              <template slot-scope="scope" style="">
                    {{scope.row.contacts}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='联系电话'>
              <template slot-scope="scope" style="">
                    {{scope.row.phone}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='办班地点'>
              <template slot-scope="scope" style="">
                    {{scope.row.place}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='备注'>
              <template slot-scope="scope" style="">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='操作' width="390">
                <template slot-scope="scope">
                    <el-button type="primary"  plain size="mini" @click="handleedit(scope.row)">编辑</el-button>
                    <el-button type="primary"  plain size="mini" @click="handleDelRow(scope.row)">删除</el-button>
                      <el-button type="primary"  plain size="mini" @click="handlerecordadd(scope.row)">添加培训记录</el-button>
                        <el-button type="primary"  plain size="mini" @click="handlerecorddetail(scope.row)">查看培训记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
       
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.p" :page-sizes="[10,20,30, 50]" :page-size="query.ps" layout="total,sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <add ref="add"  @refreshCurrentData='refreshCurrentData'></add>
        <edit ref="edit"  @refreshCurrentData='refreshCurrentData'></edit>
        <addtrainrecord ref="addtrainrecord"  @refreshCurrentData='refreshCurrentData'></addtrainrecord>
        <detailtrainrecord ref="detailtrainrecord"  @refreshCurrentData='refreshCurrentData'></detailtrainrecord>
    </div>
</template>




<script>
import {
 gettrainpage,
 deletetrain,
} from "@/api/training";
 
 import  add  from "./add";
 import edit from "./edit";
 import addtrainrecord from "./addtrainrecord";
 import detailtrainrecord from "./detailtrainrecord";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  year:"",
  periods:""
};

export default {
components: {
   add,
   edit,
   addtrainrecord,
   detailtrainrecord
  },
  data() {
    return {
      list: null,
      total: null,
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
    this.getPageList();
  },
  methods: {
    
 
    handleedit(row){
        this.$refs.edit.showData(row.id);
    },
    handlerecordadd(row){
        this.$refs.addtrainrecord.showData(row.id);
    },
    handlerecorddetail(row){
        this.$refs.detailtrainrecord.showData(row.id);
    },
    refreshCurrentData(){
        this.handleSearch();
    },
  handleDelRow(val){
           this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                      deletetrain({ids: val.id})
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
    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
      gettrainpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.trainPage.list;
          this.total = response.data.trainPage.totalRow;
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
                      deletetrain({ids: ids})
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

