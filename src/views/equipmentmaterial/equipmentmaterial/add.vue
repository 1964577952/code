<template>
<el-dialog 
           title="创建装备物资" 
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
                        <el-form-item label="装备物资名称" >
                           <el-input v-model="form.name" placeholder="请输入装备物资名称"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                  <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="装备类型" >
                           <el-select v-model="form.typeId " placeholder="请选择装备类型" style="width:220px">
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
                    <el-col :span="24">
                        <el-form-item label="数量单位" >
                           <el-input v-model="form.quantityUnit" placeholder="请输入数量单位"></el-input>
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
               <el-button type="primary" @click="submitForm('form')" :loading="isLoading">确定</el-button>
               <el-button type="info"  @click="dialogFormVisible = false">取消</el-button>
            </div>
           
        </el-form>
    </div>
      </el-dialog>
</template>
<script>
import {
saveequipment,
 getequipmentpage,
 findtree
} from "@/api/equipmentmaterial";

const defaultData={
  typeId:null,
};

export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      },
       parentTypeItems:[],
      stateItems:[
          {id:1,name:'有效'},
          {id:0,name:'无效'}
      ]
        
    };
  },
  created() {
      this.getparentTypeItems();
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
   getparentTypeItems() {
      findtree({findType:'listallleaf'})
        .then(response => {
          this.parentTypeItems =  response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
 
    submitForm(formName) {
      
   
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?equipment.name="+ this.form.name
           +"&equipment.typeId="+this.form.typeId
           +"&equipment.quantityUnit="+this.form.quantityUnit
          +"&equipment.remark="+this.form.remark;
          saveequipment(params)
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