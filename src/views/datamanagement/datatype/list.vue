<template>
    <div class="app-container aside-container">

        <el-row :gutter="20">
             <el-col :span="6">
                 <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>资料类型树</span>
                         <el-button @click="handleDel" style="float: right; padding: 3px 0" type="text">删除</el-button>
                        
                         <el-button @click="handleAdd" style="float: right; padding: 3px 0; padding-right:10px;" type="text">新增</el-button>
                    </div>
                    <el-tree
                        :data="datatree"
                       
                        node-key="id"
                        ref="tree" 
                        :default-expand-all="true" 
                        :expand-on-click-node="false"
                        :highlight-current ="true"
                        :props="defaultProps" 
                        @node-click="handleedit">
                     </el-tree>
                </el-card>
             </el-col>
             <el-col :span="18">
                <div class="tabletitle">
                     <div><svg-icon icon-class="tabcol" />资料类型</div>
                </div>
                <edit v-show="isEdit"  ref="edit" @refreshCurrentData='refreshCurrentData'></edit>
                <add   v-show="!isEdit" ref="add"  @refreshCurrentData='refreshCurrentData'></add>    
             </el-col>
         </el-row>
        <!-- <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
            <el-form label-width="120px">
                <el-row :gutter="20">
                    <el-col :span="6">
                        <el-form-item label="资料类型">
                             <el-input v-model="query.type" placeholder="请输入资料类型"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="left">
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
            <el-table-column align="center" label='资料类型'>
                <template slot-scope="scope">
                    {{scope.row.type}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
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
        <edit ref="edit"  @refreshCurrentData='refreshCurrentData'></edit> -->
    </div>
</template>




<script>
import {
 getdataTypepage,
 deletedataType
} from "@/api/datamanagement";
 import add from "./add";
 import edit from "./edit";
import { Message } from "element-ui";
import JsTreeList from "js-tree-list"
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
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
       isEdit:true,
      multipleSelection:[],
        defaultProps: {
          children: 'children',
          label: 'type'
        },
          datatree: [],
    };
  },
  created() {
    this.getPageList();
  },
  methods: {
    
 
    handleedit(data){
          this.isEdit = true;
        this.$refs.edit.showData(data.id);
    },
    
    refreshCurrentData(){
        this.handleSearch();
    },

    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      //根据查询条件获取分页数据
      getdataTypepage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.dataTypePage.list;
          this.total = response.data.dataTypePage.totalRow;
           const tree = new JsTreeList.ListToTree(this.list, {
            key_id: "id",
            key_parent: "pId",
            key_child: "children",
            key_label: "type"
            }).GetTree()
            this.datatree = tree;
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
        var currentnode =this.$refs.tree.getCurrentNode();
        console.log(currentnode) ;
        this.isEdit = false;
        this.$refs.add.showData(currentnode == null ? 0 :currentnode.id);
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
                      deleteenterprise({ids: val.id})
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
        var currentnode =this.$refs.tree.getCurrentNode();

           this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                      deletedataType({ids: currentnode.id})
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

