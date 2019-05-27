<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
              <el-input placeholder="请输入装备物资名称进行搜索" v-model="query.keyword" class="input-with-select" style="width:50%;">
              
                 <el-select v-model="query.checkTypeId "   slot="prepend" style="width:220px">
                       <el-option label="装备物资类型" value=""></el-option>
                        <el-option
                        v-for="item in parentTypeItems"
                        :key="item.id"
                        :label="item.type"
                        :value="item.id">
                        </el-option>
                    </el-select>
                <el-button slot="append" @click="handleSearch" size="mini">搜索</el-button>

            </el-input>
        </div>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />列表</div>
            <div style="float:right;padding-right:20px;">
                <!-- <el-button type="primary"  plain size="mini" @click="handleAdd">新增</el-button> -->
            </div>
        </div>
        <el-table style="margin-top:10px;" :data="list" v-loading.body="listLoading" element-loading-text="Loading"  @selection-change="handleSelectionChange" fit highlight-current-row>
           
            <el-table-column type="index" tpye="" align="center" label='序号' width="55">
                <template slot-scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='装备物资类型'>
                <template slot-scope="scope">
                    {{scope.row.typename}}
                </template>
            </el-table-column>
        
             <el-table-column align="center" label='物资名称'>
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='数量单位'>
                <template slot-scope="scope">
                    {{scope.row.quantityUnit}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='备注'>
                <template slot-scope="scope">
                    {{scope.row.remark}}
                </template>
            </el-table-column>
            <el-table-column align="left" label='操作' width="330">
                <template slot-scope="scope">
                    <el-button type="primary"  plain size="mini" @click="handleadd(scope.row)">添加维保记录</el-button>
                    <el-button type="primary"  plain size="mini" @click="handlehistory(scope.row)">查看维保记录</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination-container">
       
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="query.p" :page-sizes="[10,20,30, 50]" :page-size="query.ps" layout="total,sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>   
         <add ref="add"  @refreshCurrentData='refreshCurrentData'></add>    
         <detail ref="detail" ></detail>    
         
    </div>
</template>




<script>
import {
 getequipmentpage,
 deleteequipment,
 findtree
} from "@/api/equipmentmaterial";

 import add from "./add";
 import detail from "./detail";

import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
   typeId:'',
   checkTypeId:'',
   name:'',
   m:'',
};

export default {
components: {
   add,detail
  },
  data() {
    return {
      list: null,
      total: null,
      parentTypeItems:[],
      query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
      stateItems:[
          {id:'是',name:'是'},
          {id:'否',name:'否'}
      ],
      typeParentItems:[],
    };
  },
  created() {
      this.getparentTypeItems();
    this.getPageList();
  },
  methods: {
    handleadd(row){
       this.$refs.add.showData(row.id);
    },
    handlehistory(row){
       this.$refs.detail.showData(row.id);
    },
     getparentTypeItems() {
      findtree({findType:'listalltree'})
        .then(response => {
          this.parentTypeItems =  response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    refreshCurrentData(){
        this.handleSearch();
    },

    //获取分页数据
    getPageList() {
      //激活load
      this.listLoading = true;
      
      //根据查询条件获取分页数据
        this.query.name='like,'+this.query.keyword;
      if(this.query.checkTypeId != ''){
            this.query.typeId='=,'+this.query.checkTypeId;
      }else{
          this.query.typeId='';
      }
      getequipmentpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.equipmentPage.list;
          this.total = response.data.equipmentPage.totalRow;
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
                      deleteequipment({ids: ids})
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

