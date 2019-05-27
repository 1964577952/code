<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
               <el-input placeholder="请输入计划标题进行搜索" v-model="query.keyword" class="input-with-select" style="width:50%;">
            
                             <el-select  v-model="query.typeId" slot="prepend"  style="width:140px;" >
                             <el-option label="选择计划类别" value="" ></el-option>
                              <el-option
                                v-for="item in planTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                   
                <!-- <el-select  v-model="query.state"   slot="prepend" style="width:120px;">
                    <el-option label="状态" value=""></el-option>
                    <el-option
                    v-for="item in stateItems"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                    </el-option>
                </el-select> -->
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
            <el-table-column align="center" label='计划类别'>
                <template slot-scope="scope">
                    {{scope.row.plantype}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='计划时长'>
                <template slot-scope="scope">
                    {{scope.row.duration}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='计划标题'>
                <template slot-scope="scope">
                    {{scope.row.title}}
                </template>
            </el-table-column>
             <el-table-column align="center" label='计划内容'>
                <template slot-scope="scope">
                    {{scope.row.content}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='开始时间'>
                <template slot-scope="scope">
                    {{scope.row.startDate}}
                </template>
            </el-table-column>
            <el-table-column align="center" label='结束时间'>
                <template slot-scope="scope">
                    {{scope.row.endDate}}
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
 getplanpage,
 deleteplan,
 getplanTypepage
} from "@/api/plan";
 import add from "./add";
 import edit from "./edit";
import { Message } from "element-ui";
const queryData = {
  keyword: "",
  ps: 20,
  p: 1,
  m:'',
  keyword:'',
  typeId:'',
  title:''

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
      planTypeItems:null,
      durationItems:[
          {id:'周计划',name:'周计划'},
          {id:'月计划',name:'月计划'},
          {id:'季计划',name:'季计划'},
          {id:'年计划',name:'年计划'},
      ]
    };
  },
  created() {
    this.getPageList();
    this.getPlanTypeItems();
  },
  methods: {
    handleedit(row){
        this.$refs.edit.showData(row.id);
    },
    
    refreshCurrentData(){
        this.handleSearch();
    },
    //获取计划类别下拉
    getPlanTypeItems(){
        getplanTypepage(this.query)
        .then(response => {
          //绑定分页列表
          this.planTypeItems =  response.data.planTypePage.list;
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
      this.query.title ="like,"+this.query.keyword;

      getplanpage(this.query)
        .then(response => {
          //绑定分页列表
          this.list =  response.data.planPage.list;
          this.total = response.data.planPage.totalRow;
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
                    deleteplan({ids: val.id})
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
                      deleteplan({ids: ids})
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

