<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
             <el-input placeholder="请输入工号/姓名/手机号/学历/职务/职称...进行搜索" v-model="query.keyword" class="input-with-select" style="width:50%;">
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
        <el-table max-height="500"  style="margin-top:10px;"  @selection-change="handleSelectionChange" :data="list" v-loading.body="listLoading" element-loading-text="Loading" fit highlight-current-row>
             <el-table-column
            type="selection"
            width="55"></el-table-column>
            <el-table-column type="index" tpye="" align="center" label='序号' width="55">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='员工号' width="80">
                <template slot-scope="scope">
                    {{scope.row.number}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='单位-部门' width="200">
              <template slot-scope="scope" style="">
                    {{scope.row.unitname}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='姓名' width="60">
              <template slot-scope="scope" style="">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='性别'  width="50">
              <template slot-scope="scope" style="">
                    {{scope.row.sex}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='手机号'  width="120">
              <template slot-scope="scope" style="">
                    {{scope.row.phone}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='职务'>
              <template slot-scope="scope" style="">
                    {{scope.row.duty}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='学历'>
              <template slot-scope="scope" style="">
                    {{scope.row.education}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='职称'>
              <template slot-scope="scope" style="">
                    {{scope.row.title}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='操作' width="220">
                <template slot-scope="scope">
                    <el-button type="primary"  plain size="mini" @click="handleedit(scope.row)">编辑</el-button>
                    <el-button type="primary"  plain size="mini" @click="handleDelRow(scope.row)">删除</el-button>
                    <el-button type="primary"   plain size="mini" @click="handledetail(scope.row)">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
       <div class="pagination-container">
       
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.p" :page-sizes="[10,20,30, 50]" :page-size="query.ps" layout="total,sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
        <add ref="add"  @refreshCurrentData='refreshCurrentData'></add>
        <edit ref="edit"  @refreshCurrentData='refreshCurrentData'></edit>
        <detail ref="detail"  ></detail>
    </div>
</template>




<script>
import {
 getworker,
 deleteworker,
 
} from "@/api/personne";
import {
 getunitpage,
 findtree
} from "@/api/basicconfiguration";
import add from './add';
import detail from './detail';
import edit from './edit';
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  number:'',
  name:'',
  phone:'',
  education:'',
  duty:'',
  title:'',
  address:'',
  m:''
};

export default {
components: {
   add,
   detail,
   edit
  },
  data() {
    return {
      list: null,
      total: null,
       unitItems:null,
      query: Object.assign({}, queryData),
      listLoading: null,
       multipleSelection:[],
    };
  },
  created() {
      this.getunitItems();
    this.getPageList();
  },
  methods: {
     
    getunitItems() {
      findtree({findType:'listallleaf'})
        .then(response => {
          this.unitItems =  response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleedit(row){
          this.$refs.edit.showData(row.id);
    },
    handledetail(row){
          this.$refs.detail.showData(row.id);
    },
     handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    refreshCurrentData(){
            this.getPageList();
        },
    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
       this.query.number= 'like,'+this.query.keyword;
      this.query.name= 'like,'+this.query.keyword;
      this.query.phone= 'like,'+this.query.keyword;
      this.query.education= 'like,'+this.query.keyword;
      this.query.duty= 'like,'+this.query.keyword;
      this.query.title= 'like,'+this.query.keyword;
   
      this.query.m= 'or';
      getworker(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.workderPage.list;
          //绑定数据总数用于分页控件
          this.total = response.data.workderPage.totalRow;
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
    handleDelRow(val){
        this.$confirm('此操作将删除数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                    deleteworker({ids: val.id})
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
                      deleteworker({ids: ids})
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

