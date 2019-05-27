<template>
<el-dialog 
           title="编辑医护" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
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
                        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="sex">
                            <el-radio-group v-model="form.sex">
                                <el-radio label="男" key="男">男</el-radio>
                                <el-radio label="女" key="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="手机号" prop="phone">
                            <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属单位" prop="unit">
                            <el-input v-model="form.unit" placeholder="请输入所属单位"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="生日" prop="birth">
                            <el-date-picker v-model="form.birth" type="date"  value-format ="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择生日" >
                            </el-date-picker>
                        </el-form-item>

                    </el-col>
                  
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学历"  prop="education">
                            <el-select v-model="form.education" placeholder="请选择学历">
                                 <el-option
                                v-for="item in educationItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label="专业" prop="major">
                           <el-input v-model="form.major"  placeholder="请输入专业"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职称" prop="title">
                           <el-select v-model="form.title" placeholder="请选择职称">
                               <el-option
                                v-for="item in titleItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="邮箱" prop="email">
                           <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特长" prop="speciality">
                            <el-input v-model="form.speciality" placeholder="请输入特长"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="联系地址" prop="address">
                             <el-input v-model="form.address" placeholder="请输入联系地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
               
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark">
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
  updatemedical,
  editmedical,
} from "@/api/personne";
const defaultData={
number:'',
name:'',
sex:'',
phone:'',
unit:'',
birth:'',
education:'',
major:'',
title:'',
email:'',
speciality:'',
address:'',
remark:'',
unitId:''
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
       educationItems:[
           {id:'大专',name:'大专'},
           {id:'本科',name:'本科'},
           {id:'博士',name:'博士'},
           {id:'其他',name:'其他'},
       ],
       dutyItems:[
           {id:'主管',name:'主管'},
           {id:'项目经理',name:'项目经理'},
           {id:'科研组长',name:'科研组长'},
           {id:'职员',name:'职员'},
       ],
       titleItems:[
           {id:'初级职称',name:'初级职称'},
           {id:'中级职称',name:'中级职称'},
           {id:'高级职称',name:'高级职称'},
       ],
      rules: {
         name: [
          { required: true, message: "姓名必填", trigger: "blur" }
        ],
        // number: [
        //   { required: true, message: "员工号必填", trigger: "blur" }
        // ],

        sex: [
          { required: true, message: "性别必填", trigger: "blur" }
        ],
        // education: [
        //   { required: true,  message: "学历必填", trigger: "blur" }
        // ],
        phone: [
          { required: true, message: "手机号必填", trigger: "blur" }
        ],  
        unit : [
          { required: true, message: "所属单位必填", trigger: "blur" }
        ],
        // unitId : [
        //   { required: true, message: "单位部门必选", trigger: "blur" }
        // ],
        major: [
          { required: true, message: "专业必填", trigger: "blur" }
        ],
         email: [
          { required: true, message: "邮箱必填", trigger: "blur" }
        ],
         speciality: [
          { required: true, message: "特长必填", trigger: "blur" }
        ],
         address: [
          { required: true, message: "联系地址必填", trigger: "blur" }
        ],
         remark: [
          { required: true, message: "备注必填", trigger: "blur" }
        ],

      
        duty: [
          { required: true, message: "职务必填", trigger: "blur" }
        ],
        // title: [{ required: true, message: "职称必填", trigger: "blur" }],
        birth: [
          { required: true, message: "生日必填", trigger: "blur" }
        ]
      }
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
        if(val !=null && val != undefined){
            this.fetchData(val);
        }
    }, 
    //获取默认数据
    fetchData(val) {
      editmedical({id:val})
        .then(response => {
           this.form=response.data.medical;
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true;
             const params= "?medical.unit="+ this.form.unit
         + "&medical.id="+this.form.id
         + "&medical.name="+this.form.name
         + "&medical.sex="+this.form.sex
         + "&medical.phone="+this.form.phone
          + "&medical.birth="+this.form.birth
          +"&medical.education="+this.form.education
           +"&medical.major="+this.form.major
           +"&medical.email="+this.form.email
         + "&medical.title="+this.form.title
          +"&medical.address="+this.form.address
          +"&medical.speciality="+this.form.speciality
          +"&medical.remark="+this.form.remark;
          updatemedical(params)
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