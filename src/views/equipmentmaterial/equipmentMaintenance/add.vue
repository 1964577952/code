<template>
<el-dialog 
           title ="添加维保记录"
           :visible.sync="dialogFormVisible">
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="75px"  @submit.prevent="onSubmit">
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="装备编码" >
                            <el-input v-model="form.equipmentCode" placeholder="请输入装备编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="维保日期" >
                          <el-date-picker v-model="form.time" type="date"  value-format ="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="选择维保日期" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="单位" >
                            <el-input v-model="form.company" placeholder="请输入单位"></el-input>
                        </el-form-item>
                         
                    </el-col>
                    
                    <el-col :span="12">
                      <el-form-item label="部门" >
                         <el-input v-model="form.department" placeholder="请输入部门"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                     <el-col :span="12">
                      <el-form-item label="维保人" >
                            <el-input v-model="form.maintenancePerson" placeholder="请输入维保人"></el-input>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="是否储备" >
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
saveequipmentMaintenance,
 showequipment
} from "@/api/equipmentmaterial";
const defaultData={
  equipmentCode:'',
  company:'',
  department:'',
  maintenancePerson:'',
  time:'',
  remark:'',
};
const queryData = {
  keyword: "",
  ps: 999,
  p: 1
};

export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      equipment:null,
      unitItems:null,
      query: Object.assign({}, queryData),
      rules: {
      },
      storageItems:null,
      inout:null,
      titles:null,
        
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
     this.getequipmentmaterial(val);
    },
    getequipmentmaterial(val){
       showequipment({id:val})
        .then(response => {
           this.equipment=response.data.equipment;
        })
        .catch(err => {
            this.isLoading = false;
        });
      
    },
 
    submitForm(formName) {
      
   
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?equipmentMaintenance.equipmentCode="+ this.form.equipmentCode
           +"&equipmentMaintenance.equipmentId="+ this.equipment.id
           +"&equipmentMaintenance.company="+this.form.company
           +"&equipmentMaintenance.department="+this.form.department
           +"&equipmentMaintenance.maintenancePerson="+this.form.maintenancePerson
           +"&equipmentMaintenance.time="+this.form.time
          +"&equipmentMaintenance.remark="+this.form.remark;
          saveequipmentMaintenance(params)
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