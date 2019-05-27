<template>
<el-dialog 
           title="查看值班记录" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
    <div class="components-container">
       <div class="block">
        <el-timeline>
          <el-timeline-item    v-for="(item, index) in list"
           :key="index"
           :timestamp="item.logTime"
            placement="top"
           >
           <el-card>
                <el-row :gutter="20">
                    <el-col :span="6">
                       日志时间:{{item.logTime}}
                    </el-col>
                     <el-col :span="6">
                        事件方式: {{item.eventMode}}
                    </el-col>
                    <el-col :span="6">
                        事由:{{item.cause}}
                    </el-col>
                     <el-col :span="6">
                        事件内容:{{item.content}}
                    </el-col>
                </el-row>
               <el-row :gutter="20">
                    <el-col :span="6">
                       访问人数:{{item.number}}
                    </el-col>
                     <el-col :span="6">
                        访者姓名: {{item.name}}
                    </el-col>
                    <el-col :span="6">
                        有效证件:{{item.idtype}}
                    </el-col>
                     <el-col :span="6">
                        证件号码:{{item.idcode}}
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                       备注:{{item.remark}}
                    </el-col>
                </el-row>
            </el-card>
          </el-timeline-item>
            
        </el-timeline>
        </div>
    </div>
      </el-dialog>
</template>
<script>
import {
 getdutyLogpage
} from "@/api/emergencyduty";


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      list:null
    };
  },
  created() {
   
  },

  watch: {
    $route: "fetchData"
  },
  methods: {
    showData(val) {
        let page = this;
        page.dialogFormVisible = true;
        this.list =  null;
         if(val !=null && val != undefined){
            this.fetchData(val);
        }
    },
    //获取默认数据
    fetchData(val) {
       getdutyLogpage({})
        .then(response => {
            this.list =  response.data.dutyLogPage.list;
        })
        .catch(err => {
            console.log(err);
        });
   
    },
    
    refreshCurrentData(){
        this.$emit("refreshCurrentData");
    },

  }
};
</script>