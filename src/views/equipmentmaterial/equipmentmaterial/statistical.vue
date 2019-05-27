<template>
    <div class="app-container aside-container">
        <div class="tabletitle">
            <div>
                <svg-icon icon-class="tabcol" />查询筛选</div>
        </div>
        <div class="filter-container" style="margin-top:20px;">
           装备物资类型：
             <el-select  v-model="query.equipment_type"   slot="prepend" style="width:120px;" @change="change">
                    <el-option label="装备" value="1"></el-option>
                     <el-option label="物资" value="2"></el-option>
                </el-select>
            是否储备：
             <el-select  v-model="query.isReserve"   slot="prepend" style="width:120px;" @change="change">
                    <el-option label="非储备" value="0"></el-option>
                     <el-option label="是储备" value="1"></el-option>
  
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
} from "@/api/equipmentmaterial";
 import piechart from "./piechart";
 import linechart from "./linechart";
 
import { Message } from "element-ui";
const queryData = {
equipment_type :'1',
isReserve:'0'
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
       countByField(this.queryData)
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

