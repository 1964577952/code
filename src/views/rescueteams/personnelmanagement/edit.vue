<template>
<el-dialog 
           title="编辑人员" 
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
                        <el-form-item label="员工号" prop="number">
                           <el-input v-model="form.number" placeholder="请输入员工号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别">
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
                    <el-col :span="16">
                        <el-form-item label="单位-部门" prop="unitId">
                            <el-select v-model="form.unitId " placeholder="请选择单位-部门">
                                <el-option
                                v-for="item in unitItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                            <!-- <el-input v-model="form.birthday" :readonly="true" ></el-input> -->
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
                        <el-form-item label="职务" prop="duty">
                            <el-select v-model="form.duty" placeholder="请选择职务">
                                <el-option
                                v-for="item in dutyItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
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
                        <el-form-item label="生日" prop="birth">
                            <el-date-picker v-model="form.birth" type="date"  value-format ="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择生日" >
                            </el-date-picker>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="登录账号">
                            <el-input v-model="form.accountId" placeholder="请输入登录账号"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="民族">
                             <el-input v-model="form.nation" placeholder="请输入民族"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份证号">
                            <el-input v-model="form.idcode" placeholder="请输入身份证号" ></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="籍贯">
                            <el-input v-model="form.nativePlace"  placeholder="请输入籍贯"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="参加工作日期">
                            <el-date-picker v-model="form.workDate" type="date"  value-format ="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请选择参加工作日期" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                           <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业">
                           <el-input v-model="form.major"  placeholder="请输入专业"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="家庭住址">
                            <el-input v-model="form.address" placeholder="请输入家庭住址" ></el-input>
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
  updateworker,
  editworker,
} from "@/api/personne";
import {
 getunitpage,
  findtree
} from "@/api/basicconfiguration";
const defaultData={

};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
       unitItems:null,
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
        number: [
          { required: true, message: "员工号必填", trigger: "blur" }
        ],

        sex: [
          { required: true, message: "性别必填", trigger: "blur" }
        ],
        education: [
          { required: true, message: "学历必填", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号必填", trigger: "blur" }
        ],
        unitId : [
          { required: true, message: "单位部门必选", trigger: "blur" }
        ],
        education: [
          { required: true, message: "学历必填", trigger: "blur" }
        ],
        duty: [
          { required: true, message: "职务必填", trigger: "blur" }
        ],
        title: [{ required: true, message: "职称必填", trigger: "blur" }],
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
            this.getunitItems();
        }
    }, 
    //获取默认数据
    fetchData(val) {
      editworker({id:val})
        .then(response => {
           this.form=response.data.worker;
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
    getunitItems() {
     findtree({findType:'listallleaf'})
        .then(response => {
          this.unitItems =  response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true;
            const params= "?worker.number="+ this.form.number
         + "&worker.id="+this.form.id
         + "&worker.accountId="+this.form.accountId
         + "&worker.name="+this.form.name
         + "&worker.sex="+this.form.sex
         + "&worker.phone="+this.form.phone
          +"&worker.education="+this.form.education
         + "&worker.duty="+this.form.duty
         + "&worker.title="+this.form.title
         + "&worker.nativePlace="+this.form.nativePlace
         + "&worker.nation="+this.form.nation
         + "&worker.idcode="+this.form.idcode
         + "&worker.birth="+this.form.birth
          +"&worker.workDate="+this.form.workDate
          +"&worker.email="+this.form.email
          +"&worker.major="+this.form.major
          +"&worker.address="+this.form.address
          +"&worker.unitId="+this.form.unitId
          +"&worker.remark="+this.form.remark;
          updateworker(params)
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