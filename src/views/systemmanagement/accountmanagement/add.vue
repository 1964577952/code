<template>
<el-dialog 
           title="新增用户" 
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="156px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="用户名" >
                           <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="密码" >
                           <el-input  v-model="form.password " placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="昵称" >
                           <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
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
saveaccount
} from "@/api/system";

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
      stateItems:[
          {id:1,name:'有效'},
          {id:0,name:'无效'}
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
    showData() {
        let page = this;
        page.dialogFormVisible = true;
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }
        this.form =  Object.assign({}, defaultData);
    },
    //获取默认数据
    fetchData() {
    
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?userName="+ this.form.userName 
          +"&password="+this.form.password 
          +"&nickName="+this.form.nickName  ;
          if(this.form.password.length <6){
                this.$message({
                  message: "密码至少6位",
                  type: "error"
                });
                  this.isLoading = false;
                return;
          }
          saveaccount(params)
            .then(response => {
              if(response.data.state =="ok"){
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
              }
             
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