<template>
<el-dialog 
           title="创建训练" 
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
                    <el-col :span="24">
                        <el-form-item label="训练类别" prop="type">
                           <el-select  v-model="form.typeId" placeholder="请选择训练类别" >
                              <el-option
                                v-for="item in parentTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="训练时长(H)" >
                           <el-input-number v-model="form.duration" style="width:150px;" :precision="1" :step="0.5" :max="100">
                           </el-input-number>
                        </el-form-item>
                    </el-col>
                      <el-col :span="12">
                        <el-form-item label="训练开始时间" >
                            <el-date-picker
                            v-model="form.startTime"
                            type="datetime"
                            placeholder="选择日期时间"
                            align="right" 
                            format="yyyy-MM-dd HH:mm:ss" 
                            value-format ="yyyy-MM-dd HH:mm:ss" 
                            :picker-options="pickerOptions1"
                            style="width:200px;">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
              
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="应到人数" >
                           <el-input-number v-model="form.should"   style="width:150px;" :step="1" :max="100"></el-input-number>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="实到人数" >
                           <el-input-number v-model="form.actual" style="width:150px;" :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
               
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="缺席人" >
                            <el-input v-model="form.absent" placeholder="请输入缺席人"></el-input>
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
               <el-button type="primary" @click="submitForm()" :loading="isLoading">确定</el-button>
               <el-button type="info"  @click="dialogFormVisible = false">取消</el-button>
            </div>
           
        </el-form>
    </div>
      </el-dialog>
</template>
<script>
import {
 savedrill,
 getdrilltypepage,
 findtree
} from "@/api/training";

const defaultData={
    typeId:null,
    duration:'',
    startTime:null,
    should:0,
    actual:0,
    absent:'',
    remark:''
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      parentTypeItems:null,
      rules: {
        // type: [
        //   { required: true, message: "日常训练类型必填", trigger: "blur" }
        // ]
      },
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
    };
  },
  created() {
    this.fetchData();
  },

  watch: {
    $route: "fetchData"
  },
  methods: {
    showData() {
       this.form=Object.assign({}, defaultData);
        let page = this;
        page.dialogFormVisible = true;
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }

        findtree({findType:'listallleaf'})
        .then(response => {
          this.parentTypeItems =   response.data;;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取默认数据
    fetchData() {
      
      
    },

    
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;
        
          const params= "?drill.typeId="+this.form.typeId
          +"&drill.duration="+ this.form.duration
          +"&drill.startTime="+ this.form.startTime
          +"&drill.should="+ this.form.should
          +"&drill.actual="+ this.form.actual
          +"&drill.absent="+ this.form.absent
          +"&drill.remark="+this.form.remark;
          
          savedrill(params)
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