<template>
<el-dialog 
           title="创建培训" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:50px;">
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="156px" @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div style="width:100%;margin-left:-25px;">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="办班单位" >
                           <el-input v-model="form.company" placeholder="请输入办班单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系人" >
                            <el-input v-model="form.contacts" placeholder="请输入联系人"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系电话">
                           <el-input v-model="form.phone" placeholder="请输入联系电话"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="办班地点" >
                            <el-input v-model="form.place" placeholder="请输入办班地点"></el-input>
                        </el-form-item>
                    </el-col>
                   <el-col :span="8">
                        <el-form-item label="办班年份" >
                            <el-date-picker
                                v-model="form.year"
                                type="year"
                                  format="yyyy-MM-dd" 
                                 value-format ="yyyy-MM-dd" 
                                placeholder="选择年份">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="期数" >
                            <el-input v-model="form.periods" placeholder="请输入期数"></el-input>
                        </el-form-item>
                    </el-col>
                  
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="16">
                        <el-form-item label="办班时间"  >
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
                    <el-col :span="8">
                        <el-form-item label="计划培训人数">
                            <el-input-number v-model="form.number"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="培训类别" >
                            <el-select v-model="form.typeId"   placeholder="请选择训练类别" >
                              <el-option
                                v-for="item in parentTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="培训对象">
                            <el-input v-model="form.object" placeholder="培训对象"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="计划考试时间">
                            <el-date-picker
                            v-model="form.examinationTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            value-format ="yyyy-MM-dd HH:mm:ss" 
                            :picker-options="pickerOptions1">
                            </el-date-picker>
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
 getdrilltypepage,
 savetrain,
 edittrain,
 updatetrain
} from "@/api/training";

const defaultData={
  startTimeArray:[]
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      },
        parentTypeItems:[],
        pickerOptions1: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
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
    this.getdrilltypeItems();
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
      edittrain({id:val})
        .then(response => {
           this.form=response.data.train;
           if(this.form.startTime != null && this.form.startTime != undefined && this.form.endTime != null && this.form.endTime != undefined){
                this.form.startTimeArray =  [this.form.startTime,this.form.endTime];    
           }
           
        })
        .catch(err => {
            this.isLoading = false;
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
           const params= "?train.year="+this.form.year
          +"&train.id="+ this.form.id
          +"&train.company="+ this.form.company
          +"&train.contacts="+ this.form.contacts
          +"&train.phone="+ this.form.phone
          +"&train.place="+ this.form.place
          +"&train.periods="+ this.form.periods
          +"&train.startTime="+ this.form.startTime
          +"&train.endTime="+ this.form.endTime
          +"&train.number="+ this.form.number
          +"&train.object="+ this.form.object
          +"&train.examinationTime="+ this.form.examinationTime
          +"&train.remark="+this.form.remark;
          updatetrain(params)
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
    getdrilltypeItems(){
        getdrilltypepage()
        .then(response => {
            this.parentTypeItems =  response.data.drillTypePage.list;
        })
        .catch(err => {
            console.log(err);
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