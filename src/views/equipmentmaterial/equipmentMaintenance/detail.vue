<template>
<el-dialog 
           title="查看维保记录" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
    <div class="components-container">
       <div class="block">
        <el-timeline>
          <el-timeline-item    v-for="(item, index) in list"
           :key="index"
           :timestamp="item.time"
            placement="top"
           >
           <el-card>
                <el-row :gutter="20">
                    <el-col :span="8">
                       装备编码:{{item.equipmentCode}}
                    </el-col>
                     <el-col :span="8">
                        单位: {{item.company}}
                    </el-col>
                    <el-col :span="8">
                        部门:{{item.department}}
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                       维保人:{{item.maintenancePerson}}
                    </el-col>
                     <el-col :span="12">
                        维保时间:{{item.time}}
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
 getequipmentMaintenancepage
} from "@/api/equipmentmaterial";

const defaulttrainData={
  
};

export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      list:null,
      formtrain:Object.assign({}, defaulttrainData),
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
       getequipmentMaintenancepage({ps:99,p:1})
        .then(response => {
            this.list =  response.data.equipmentMaintenancePage.list;
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