<template>
<!-- <el-dialog 
           title="编辑单位" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;"> -->
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="156px" @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div style="width:100%;margin-left:-25px;">
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="名称" >
                           <el-input v-model="form.name" placeholder="请输入名称"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="电话" >
                           <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
                        </el-form-item>
                    </el-col>
                   <el-col :span="12">
                        <el-form-item label="邮编" >
                           <el-input v-model="form.zipCode" placeholder="请输入邮编"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="Email" >
                           <el-input v-model="form.email" placeholder="请输入Email"></el-input>
                        </el-form-item>
                    </el-col>
                   <el-col :span="12">
                        <el-form-item label="所在地区" >
                           <el-input v-model="form.region" placeholder="请输入所在地区"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="通讯地址" >
                           <el-input v-model="form.address" placeholder="请输入通讯地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="领导姓名" >
                           <el-input v-model="form.leader" placeholder="请输入领导姓名"></el-input>
                        </el-form-item>
                    </el-col>
                   <el-col :span="12">
                        <el-form-item label="单位状态" >
                           <el-select  v-model="form.state" placeholder="请选择状态" >
                              <el-option
                                v-for="item in stateItems"
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
                        <el-form-item label="备注" >
                           <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
           <div style="padding:10px;text-align:center">
               <el-button type="primary" v-if="isSave" @click="submitForm('form')" :loading="isLoading">确定</el-button>
            </div>
           
        </el-form>
    </div>
      <!-- </el-dialog> -->
</template>
<script>
import {
editunit,
updateunit
} from "@/api/basicconfiguration";
const defaultData={
  pId:'',
  level:'',
  name:'',
  state:'',
  phone:'',
  zipCode:'',
  email:'',
  region:'',
  address:'',
  leader:'',
  remark:'',
};



export default {
  data() {

    return {
   
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      isSave:false,
      rules: {
      },
      stateItems:[
          {id:1,name:'有效'},
          {id:0,name:'无效'}
      ]
        
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
         editunit({id:val})
        .then(response => {
           this.form=response.data.unit;
           this.isSave =true;
          
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?unit.pId="+this.form.pId
          +"&unit.id="+ this.form.id
          +"&unit.name="+ this.form.name
          +"&unit.state="+ this.form.state
          +"&unit.phone="+ this.form.phone
          +"&unit.zipCode="+ this.form.zipCode
          +"&unit.email="+ this.form.email
          +"&unit.region="+ this.form.region
          +"&unit.address="+ this.form.address
          +"&unit.leader="+ this.form.leader
          +"&unit.remark="+this.form.remark;
          updateunit(params)
            .then(response => {
              this.$message({
                message: "操作成功",
                type: "success"
              });

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