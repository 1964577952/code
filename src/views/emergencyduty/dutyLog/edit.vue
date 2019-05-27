<template>
<el-dialog 
           title="编辑值班信息" 
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
                        <el-form-item label="值班单位" >
                           <el-select  v-model="form.unitId" placeholder="请选择值班单位" >
                              <el-option
                                v-for="item in unitItems"
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
                        <el-form-item label="值班班组" >
                           <el-select  v-model="form.team" placeholder="请选择值班班组" >
                              <el-option
                                v-for="item in teamItems"
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
                        <el-form-item label="值班人员" >
                            <el-input v-model="form.person" placeholder="请输入值班人员"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="值班状态" >
                            <el-select  v-model="form.state" placeholder="请选择值班状态" >
                              <el-option
                                v-for="item in statesItems"
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
editduty,
updateduty,
} from "@/api/emergencyduty";
import {
 getunitpage
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
      },
      unitItems:null,
      teamItems:[
          {id:'早班(08:00-16:00)',name:'早班(08:00-16:00)'},
          {id:'晚班(16:00-00:00)',name:'晚班(16:00-00:00)'},
          {id:'夜班(00:00-08:00)',name:'夜班(00:00-08:00)'},
      ],
      statesItems:[
          {id:'在职',name:'在职'},
          {id:'离岗',name:'离岗'},
         
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
     
         this.geteditduty(val);
         this.getUnitItems();
    },
     geteditduty(val){
      editduty({id:val})
        .then(response => {
           this.form=response.data.duty;
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
       //获取单位下拉
    getUnitItems(){
        getunitpage({})
        .then(response => {
          //绑定分页列表
          this.unitItems =  response.data.unitPage.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
            const params= "?duty.team="+ this.form.team
            +"&duty.id="+this.form.id
          +"&duty.person="+this.form.person
          +"&duty.state="+this.form.state
          +"&duty.remark="+this.form.remark
          +"&duty.unitId="+this.form.unitId;
          updateduty(params)
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