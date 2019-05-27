<template>
<el-dialog 
           title="修改密码" 
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form"   label-width="156px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="旧密码" >
                           <el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="新密码" >
                           <el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="再次输入新密码" >
                           <el-input v-model="form.newPasswordAgain"  type="password" placeholder="请再次输入新密码"></el-input>
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
updatepassword
} from "@/api/login";

const defaultData={
  
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      }
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
           if(this.form.newPassword != this.form.newPasswordAgain){
              this.$message({
                message: "两次密码输入不一致",
                type: "error"
              });
              return false;
           }
           this.isLoading = true;
           const params= "?oldPassword="+ this.form.oldPassword
          +"&newPassword="+this.form.newPassword;
          updatepassword(params)
            .then(response => {
           
              if(response.data.state == 'fail'){
                this.$message({
                  message: response.data.msg,
                  type: "error"
                });
                 this.isLoading = false;
              }else{
                this.$message({
                  message: "操作成功",
                  type: "success"
                });
                this.dialogFormVisible = false;
                this.isLoading = false;
              }
              
              
            })
            .catch(err => {
                this.$message({
                message: "修改失败",
                type: "error"
              });
              this.isLoading = false;
            });
        } else {
         this.$message({
                message: "修改失败",
                type: "error"
              });
          return false;
        }
      });
    },
    onSubmit() {},
    handleChange(val) {}
  }
};
</script>