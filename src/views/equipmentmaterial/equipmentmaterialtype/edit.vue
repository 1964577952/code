<template>
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="156px" @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div >
                    <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="装备物资类型" >
                           <el-input v-model="form.type" placeholder="请输入装备物资类型"></el-input>
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
               <el-button type="primary" v-if="isSave"  @click="submitForm('form')" :loading="isLoading">确定</el-button>
            </div>
           
        </el-form>
    </div>
</template>
<script>
import {
editequipmentType,
updateequipmentType
} from "@/api/equipmentmaterial";

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
       isSave:false,
        
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
        if(val!=0){
          editequipmentType({id:val})
          .then(response => {
            this.form=response.data.equipmentType;
              this.isSave =true;
          })
          .catch(err => {
              this.isLoading = false;
          });
        }
         
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
            const params= "?equipmentType.type="+ this.form.type
             +"&equipmentType.id="+this.form.id
                +"&equipmentType.pId="+this.form.pId
          +"&equipmentType.remark="+this.form.remark;
          updateequipmentType(params)
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