<template>
<el-dialog 
           title="创建培训记录" 
           :visible.sync="dialogFormVisible"
           >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="办班单位" >
                            {{formtrain.company}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="办班年份/期数" >
                           {{formtrain.year}}/{{formtrain.periods}}
                        </el-form-item>
                    </el-col>
                </el-row>
                
                
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="培训时间">
                           <el-date-picker
                            v-model="form.startTimeArray"
                            type="datetimerange"
                            :picker-options="pickerOptions2"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            value-format ="yyyy-MM-dd HH:mm:ss" 
                            align="right">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                 </el-row>
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="课程名称">
                             <el-input v-model="form.className" placeholder="请输入课程名称"></el-input>
                        </el-form-item>
                    </el-col>
                 </el-row>
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="课时">
                            <el-input-number v-model="form.classHour"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                 </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="授课教师">
                            <el-input v-model="form.teacher" placeholder="请输入授课老师"></el-input>
                        </el-form-item>
                    </el-col>
                 </el-row>
               
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注">
                             <el-input v-model="form.remark"  type="textarea" :rows="2" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
            </div>
           <div style="padding:10px;text-align:center">
               <el-button type="primary" @click="submitForm('form')" :loading="isLoading">确定</el-button>
               <el-button type="info"  @click="dialogFormVisible = false">取消</el-button>
            </div>
           
        </el-form>
    </div>
      </el-dialog>
</template>
<script>
import {
 showtrain,
 savetrainrecord
} from "@/api/training";

const defaultData={
  
};
const defaulttrainData={
  
};

export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      formtrain:Object.assign({}, defaulttrainData),
      rules: {
      },
       pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
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
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }
        this.form =  Object.assign({}, defaultData);
         if(val !=null && val != undefined){
            this.fetchData(val);
        }
        
    },
    //获取默认数据
    fetchData(val) {
       showtrain({id:val})
        .then(response => {
            this.formtrain =  response.data.train;
        })
        .catch(err => {
            console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true;
            if(this.form.startTimeArray){
                this.form.startTime=this.form.startTimeArray[0];
                this.form.endTime=this.form.startTimeArray[1];
            }else{
                this.form.startTime =null;
                this.form.endTime= null;
            }

           const params= "?trainRecord.startTime="+this.form.startTime
          +"&trainRecord.endTime="+ this.form.endTime
          +"&trainRecord.className="+ this.form.className
          +"&trainRecord.classHour="+ this.form.classHour
          +"&trainRecord.teacher="+ this.form.teacher
          +"&trainRecord.remark="+ this.form.remark
          +"&trainRecord.trainId="+ this.formtrain.id;
         
          savetrainrecord(params)
            .then(response => {
              this.$message({
                message: "操作成功",
                type: "success"
              });
              this.dialogFormVisible = false;
               this.isLoading = false;
               this.refreshCurrentData();
            })
            .catch(err => {
              this.isLoading = false;
            });
        } else {
        
          return false;
        }
      });
    },

    refreshCurrentData(){
            this.$emit("refreshCurrentData");
        },
    onSubmit() {},
    handleChange(val) {}
  }
};
</script>