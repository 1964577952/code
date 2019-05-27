<template>
    <div class="app-container aside-container">
         <el-row :gutter="20">
             <el-col :span="6">
                 <el-card class="box-card" shadow="never">
                    <div slot="header" class="clearfix">
                        <span>单位部门</span>
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
                     <div><svg-icon icon-class="tabcol" />单位/部门信息</div>
                </div>
                <edit v-show="isEdit"  ref="edit"  @refreshCurrentData='refreshCurrentData'></edit>
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
                        <el-form-item label="单位名称">
                             <el-input v-model="query.name" placeholder="请输入单位名称"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="状态">
                            <el-select  v-model="query.state" placeholder="请选择状态" >
                              <el-option
                                v-for="item in stateItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6" align="center">
                        <el-form-item label="" label-width="0px">
                            <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                            <el-button type="success" size="small" @click="handleAdd">添加</el-button>
                            <el-button type="danger" size="small" @click="handleDel">删除</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />列表</div>
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
            <el-table-column align="center" label='单位名称'>
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='单位状态'>
              <template slot-scope="scope" >
                    {{scope.row.state == 1 ? '有效':'无效'}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='操作' width="200">
                <template slot-scope="scope">
                    <el-button type="danger"  plain size="mini" @click="handleedit(scope.row)">编辑</el-button>
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
 getunitpage,
 deleteunit
} from "@/api/basicconfiguration";
 import add from "./add";
 import edit from "./edit";
import { Message } from "element-ui";
import JsTreeList from "js-tree-list"
const queryData = {
  keyword: "",
  ps: 999,
  p: 1,
};

export default {
components: {
   add,
   edit
  },
  data() {
    return {
        datatree: [],
        defaultProps: {
          children: 'children',
          label: 'name'
        },
      list: null,
      total: null,
      isEdit:true,
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
      getunitpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.unitPage.list;
          this.total = response.data.unitPage.totalRow;
          const tree = new JsTreeList.ListToTree(this.list, {
            key_id: "id",
            key_parent: "pId",
            key_child: "children",
            key_label: "name"
            }).GetTree()
            this.datatree = tree;
           // console.log(tree);
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
    handleDel(){
        //const ids=this.getIds();
          var currentnode =this.$refs.tree.getCurrentNode();
          if(currentnode!=null){
                this.$confirm('此操作将删除数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                      deleteunit({ids: currentnode.id})
                        .then(response => {
                            Message({
                            message: "删除成功",
                            type: "success"
                            });
                             this.getPageList();
                           this.$refs.edit.showData(0);
                           
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
          }else{
               this.$message({
                    type: 'info',
                    message: '请选中要删除的单位'
                });  
          }
           
       
      
        
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

