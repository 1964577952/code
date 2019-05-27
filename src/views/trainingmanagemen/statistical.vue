<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
            统计维度：
             <el-select  v-model="query.field"   slot="prepend" style="width:120px;" @change="change">
                    <el-option label="办班单位" value="company"></el-option>
                     <el-option label="办班年份" value="year"></el-option>
                      <el-option label="培训对象" value="object"></el-option>
                    </el-option>
                </el-select>
        </div>
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />统计结果</div>
            <div style="float:right;padding-right:20px;">
                
            </div>
        </div>
    <el-row :gutter="20">
            <el-col :span="12">
              <linechart ref="linechart"  :chartData="linechartdata" />
            </el-col>
            <el-col  :span="12">
                <piechart  ref="piechart"  :chartData="linechartdata"  />
            </el-col>
    </el-row>
     
      
    </div>
</template>




<script>
import {
countByField
} from "@/api/training";

 import piechart from "./piechart";
 import linechart from "./linechart";
 
import { Message } from "element-ui";
const queryData = {
field :'company'
};
const defaultchartdata = {
  datafiled:[],
  datainfo:[],
  dataList:[]
};
export default {
 components: {
   piechart,
   linechart
  },
  data() {
    return {
      linechartdata: Object.assign({}, defaultchartdata),
      total: null,
      
     query: Object.assign({}, queryData),
      listLoading: null,
      multipleSelection:[],
      
     
    };
  },
  created() {
  this.countByField();
  },
  methods: {
      change(val){
            this.countByField();
      },
    countByField(){
       countByField({field:this.query.field})
        .then(response => {
          this.linechartdata = defaultchartdata;
          var datafiled=[];
          var datainfo=[];
          var dataList =[];
          if(response.data){
              response.data.forEach(element => {
                   datafiled.push(element[this.query.field]);
                    datainfo.push(element["COUNT(*)"]);
                    dataList.push({name:element[this.query.field],value:element["COUNT(*)"]});
              });
          }
         this.linechartdata.datafiled=datafiled;
         this.linechartdata.datainfo=datainfo;
         this.linechartdata.dataList=dataList;
         this.$refs.linechart.setOptions(this.linechartdata);
         this.$refs.piechart.setOptions(this.linechartdata);
         
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

