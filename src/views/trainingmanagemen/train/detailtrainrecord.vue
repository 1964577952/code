<template>
<el-dialog 
           title="查看培训记录" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
    <div class="components-container">
       <div class="block">
        <el-timeline>
          <el-timeline-item    v-for="(item, index) in list"
           :key="index"
           :timestamp="item.startTime"
            placement="top"
           >
           <el-card>
                <el-row :gutter="20">
                    <el-col :span="8">
                       办班单位:{{formtrain.company}}
                    </el-col>
                     <el-col :span="8">
                        办班年份: {{formtrain.year}}
                    </el-col>
                    <el-col :span="8">
                        培训时间:{{item.startTime}}
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                       课程名称:{{item.className}}
                    </el-col>
                     <el-col :span="8">
                        课时:{{item.classHour}}
                    </el-col>
                    <el-col :span="8">
                        授课老师:{{item.teacher}}
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                       备注:{{item.remark}}
                    </el-col>
                </el-row>
                <p style="color:rgb(193,193,193)">结束于{{item.endTime}}</p>
            </el-card>
          </el-timeline-item>
            
        </el-timeline>
        </div>
    </div>
      </el-dialog>
</template>
<script>
import {
 getdrilltypepage,
 savetrain,
 gettrainrecordpage,
 showtrain
} from "@/api/training";

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
       gettrainrecordpage({trainId:val})
        .then(response => {
            this.list =  response.data.trainRecordPage.list;
        })
        .catch(err => {
            console.log(err);
        });
         showtrain({id:val})
        .then(response => {
            this.formtrain =  response.data.train;
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