<template>
<el-dialog 
           title="创建值班信息" 
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="100px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="日志时间" >
                           <el-date-picker
                            v-model="form.logTime"
                            type="datetime"
                            placeholder="请选择日志时间"
                            format="yyyy-MM-dd HH:mm:ss" 
                            value-format ="yyyy-MM-dd HH:mm:ss" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="事件方式" >
                           <el-select  v-model="form.eventMode" placeholder="请选择事件方式" >
                              <el-option
                                v-for="item in eventItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="事由" >
                            <el-input v-model="form.cause" placeholder="请输入事由"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="事件内容" >
                            <el-input v-model="form.content"  type="textarea" :rows="2" placeholder="请输入事件内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="到访人数" >
                            <el-input-number v-model="form.number"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="访者姓名" >
                            <el-input v-model="form.name" placeholder="请输入访者姓名"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="有效证件" >
                            <el-input v-model="form.idtype" placeholder="请输入有效证件"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="证件号码" >
                            <el-input v-model="form.idcode" placeholder="请输入证件号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注" >
                            <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
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
savedutyLog
} from "@/api/emergencyduty";
const defaultData={
  
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      },
      unitItems:null,
      eventItems:[
          {id:'告警',name:'告警'},
          {id:'错误',name:'错误'},
          {id:'提示',name:'提示'},
      ],
    };
  },
  created() {
    
    this.fetchData();
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
           this.form.dutyId = val;
        }
    },
    //获取默认数据
    fetchData() {
       
    },
  
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?dutyLog.dutyId="+ this.form.dutyId
          +"&dutyLog.logTime="+this.form.logTime
          +"&dutyLog.eventMode="+this.form.eventMode
          +"&dutyLog.cause="+this.form.cause
          +"&dutyLog.content="+this.form.content
          +"&dutyLog.number="+this.form.number
          +"&dutyLog.name="+this.form.name
          +"&dutyLog.idtype="+this.form.idtype
          +"&dutyLog.idcode="+this.form.idcode
          +"&dutyLog.remark="+this.form.remark;
          savedutyLog(params)
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