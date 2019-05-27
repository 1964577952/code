<template>
<el-dialog 
            title="编辑接警登记" 
         custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="156px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="事故单位" prop="company">
                           <el-input v-model="form.company" placeholder="请输入事故单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="事故地点" >
                           <el-input v-model="form.place" placeholder="请输入事故地点"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="事故类型" >
                           <el-select  v-model="form.accidentTypeId" placeholder="请选择事故类型" >
                              <el-option
                                v-for="item in accidentTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="事故等级" >
                           <el-select  v-model="form.level" placeholder="请选择事故顶级" >
                              <el-option
                                v-for="item in levelItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
            
                <el-row :gutter="20">
                   <el-col :span="12">
                        <el-form-item label="遇险人数" >
                           <el-input-number v-model="form.distressNum"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="遇难人数" >
                           <el-input-number v-model="form.wreckNum"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                        <el-form-item label="来电时间" >
                            <el-date-picker
                            v-model="form.callTime"
                            type="datetime"
                            placeholder="请选择来电时间"
                            format="yyyy-MM-dd HH:mm" 
                            value-format ="yyyy-MM-dd HH:mm" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="来电人姓名" >
                           <el-input v-model="form.callName" placeholder="请输入来电人姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="出动时间" >
                            <el-date-picker
                            v-model="form.outTime"
                            type="datetime"
                            placeholder="请选择出动时间"
                            format="yyyy-MM-dd HH:mm" 
                            value-format ="yyyy-MM-dd HH:mm" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="来电人电话" >
                           <el-input v-model="form.callPhone" placeholder="请输入来电人电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="救护队负责人" >
                           <el-input v-model="form.leader" placeholder="请输入救护队负责人"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="来电内容" >
                           <el-input v-model="form.content"  type="textarea" :rows="2" placeholder="请输入来电内容"></el-input>
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
editalarmLog,
updatealarmLog
} from "@/api/emergencyduty";
import {
 getaccidentTypepage,
} from "@/api/basicconfiguration";
const defaultData={
  
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
           company: [
            { required: true, message: '事故单位必填', trigger: 'blur' },
          ],
      },
      accidentTypeItems:null,
      levelItems:[
          {id:'告警',name:'告警'},
          {id:'提示',name:'提示'},
         
      ],
        
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
        this.getaccidentTypeItems();
         editalarmLog({id:val})
        .then(response => {
           this.form=response.data.alarmLog;
          
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
      getaccidentTypeItems(){
        getaccidentTypepage({})
        .then(response => {
            this.accidentTypeItems =  response.data.accidentTypePage.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?alarmLog.company="+ this.form.company
           +"&alarmLog.id="+this.form.id
          +"&alarmLog.place="+this.form.place
          +"&alarmLog.accidentTypeId="+this.form.accidentTypeId
          +"&alarmLog.level="+this.form.level
          +"&alarmLog.distressNum="+this.form.distressNum
          +"&alarmLog.wreckNum="+this.form.wreckNum
          +"&alarmLog.callTime="+this.form.callTime
          +"&alarmLog.callName="+this.form.callName
          +"&alarmLog.callPhone="+this.form.callPhone
          +"&alarmLog.outTime="+this.form.outTime
          +"&alarmLog.leader="+this.form.leader
          +"&alarmLog.content="+this.form.content;
          updatealarmLog(params)
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