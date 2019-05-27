<template>
<el-dialog 
           title="编辑计划" 
          
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
                        <el-form-item label="计划类别" >
                            <el-select  v-model="form.typeId" placeholder="请选择计划类别" >
                              <el-option
                                v-for="item in planTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="计划时长" >
                          <el-select  v-model="form.duration" placeholder="请选择计划时长" >
                              <el-option
                                v-for="item in durationItems"
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
                        <el-form-item label="计划标题" >
                           <el-input v-model="form.title" placeholder="请输入计划标题"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="计划内容" >
                           <el-input v-model="form.content"  type="textarea" :rows="2" placeholder="请输入计划内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                       <el-form-item label="计划时间"  >
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
editplan,
updateplan,
getplanTypepage
} from "@/api/plan";

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
       planTypeItems:null,
      durationItems:[
          {id:'周计划',name:'周计划'},
          {id:'月计划',name:'月计划'},
          {id:'季计划',name:'季计划'},
          {id:'年计划',name:'年计划'},
      ],
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
        this.getPlanTypeItems();
        this.geteditplan(val);
    },
    geteditplan(val){
      editplan({id:val})
        .then(response => {
           this.form=response.data.plan;
          if(this.form.startDate != null && this.form.startDate != undefined && this.form.endDate != null && this.form.endDate != undefined){
                this.form.startTimeArray =  [this.form.startDate,this.form.endDate];    
           }
        })
        .catch(err => {
            this.isLoading = false;
        });
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         this.isLoading = true;
            if(this.form.startTimeArray){
                this.form.startDate=this.form.startTimeArray[0];
                this.form.endDate=this.form.startTimeArray[1];
            }else{
                this.form.startDate =null;
                this.form.endDate= null;
            }
             const params= "?plan.typeId="+ this.form.typeId
             +"&plan.id="+this.form.id
            +"&plan.duration="+this.form.duration
            +"&plan.title="+this.form.title
            +"&plan.content="+this.form.content
            +"&plan.startDate="+this.form.startDate
            +"&plan.endDate="+this.form.endDate;
          updateplan(params)
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