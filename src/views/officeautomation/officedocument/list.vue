<template>
    <div class="app-container aside-container" >
         <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
             <el-tab-pane label="发文" name="second"></el-tab-pane>
            <el-tab-pane label="收文" name="first"></el-tab-pane>
            
        </el-tabs>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
            <el-input placeholder="请输入公文标题进行搜索" v-model="query.keyword" class="input-with-select" style="width:50%;">
                <el-button slot="append" @click="handleSearch" size="mini">搜索</el-button>
            </el-input>
        </div>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />列表</div>
            <div style="float:right;padding-right:20px;">
                <el-button type="primary"  plain size="mini" v-show="activeName =='second'" @click="handleAdd">新增</el-button>
                <el-button type="primary"  plain size="mini"  v-show="activeName =='second'"  @click="handleDel">批量删除</el-button>
            </div>
        </div>
        <el-table style="margin-top:10px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading"  @selection-change="handleSelectionChange" fit highlight-current-row>
             <el-table-column
            type="selection"
            :selectable="selectableHander"
            width="55"  ></el-table-column>
            <el-table-column type="index" tpye="" align="center" label='序号' width="55">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='公文标题'>
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='发文部门'>
                <template slot-scope="scope">
                    {{scope.row.publish}}
                </template>
            </el-table-column>
              <el-table-column align="center" label='收文部门'>
                <template slot-scope="scope">
                    {{scope.row.receiver}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='发布时间'>
                <template slot-scope="scope">
                    {{scope.row.createAt}}
                </template>
            </el-table-column>
             
             <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='操作' width="220">
                <template slot-scope="scope">
                    <el-button type="primary"  plain size="mini"   @click="handledetail(scope.row)">查看</el-button>
                    <el-button type="primary"  plain size="mini"  v-show="activeName =='second' &&  (scope.row.receiverId ==null || scope.row.receiverId =='')" @click="handleedit(scope.row)">编辑</el-button>
                    <el-button type="primary"  plain size="mini" v-show="activeName =='second' &&  (scope.row.receiverId ==null || scope.row.receiverId =='')" @click="handleDelRow(scope.row)">删除</el-button>
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
 getofficeDocumentpage,
 deleteofficeDocument,
 getReceived
} from "@/api/officeautomation";
 import add from "./add";
 import edit from "./edit";
 import detail from "./detail";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  qtitle:'',
  title:''
};

export default {
components: {
   add,
   edit,
   detail
  },
  data() {
    return {
      activeName: 'second',
      list: null,
      total: null,
      query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    selectableHander(row,index){
        if(this.activeName =='second' && (row.receiverId ==null || row.receiverId =='')){
            return true;
        }else{
            return false;
        }
    },
    handledetail(row){
        this.$refs.detail.showData(row.id);
    },
    handleedit(row){
        this.$refs.edit.showData(row.id);
    },
    handleClick(tab, event) {
       this.handleSearch();
    },
    
    refreshCurrentData(){
        this.handleSearch();
    },

    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
      this.query.title='like,'+this.query.keyword;
      //收文
      if(this.activeName=='first'){
            getReceived(this.query)
            .then(response => {
            //绑定分页列表
            this.list =  response.data.officeDocumentPage.list;
            this.total = response.data.officeDocumentPage.totalRow;
            //关闭load
            this.listLoading = false;
            })
            .catch(err => {
            this.listLoading = false;
            console.log(err);
            });
      }

      if(this.activeName=='second'){
            getofficeDocumentpage(this.query)
            .then(response => {
            //绑定分页列表
            this.list =  response.data.officeDocumentPage.list;
            this.total = response.data.officeDocumentPage.totalRow;
            //关闭load
            this.listLoading = false;
            })
            .catch(err => {
            this.listLoading = false;
            console.log(err);
            });
      }
      
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
                      deleteofficeDocument({ids: val.id})
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
                      deleteofficeDocument({ids: ids})
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

