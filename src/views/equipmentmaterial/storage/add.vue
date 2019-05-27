<template>
<el-dialog 
           title="创建库房" 
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="100px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20"> 
                    <el-col :span="12">
                        <el-form-item label="库房编码" >
                           <el-input v-model="form.code" placeholder="请输入库房编码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库房名称" >
                           <el-input v-model="form.name" placeholder="请输入库房名称"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row :gutter="20"> 
                    <el-col :span="12">
                        <el-form-item label="所属单位" >
                           <el-input v-model="form.unit" placeholder="请输入所属单位"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库管员" >
                           <el-input v-model="form.keeper" placeholder="请输入库管员"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                 <el-row :gutter="20"> 
                    <el-col :span="12">
                        <el-form-item label="库房面积" >
                            <el-input-number v-model="form.area"  :step="1"  :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="所属类别" >
                            <el-select  v-model="form.type" placeholder="请选择所属类别" >
                              <el-option
                                v-for="item in typeItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                   <el-row :gutter="20"> 
                    <el-col :span="12">
                        <el-form-item label="库房等级" >
                            <el-select  v-model="form.level" placeholder="请选择库房等级" >
                              <el-option
                                v-for="item in levelItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="库房电话" >
                            <el-input v-model="form.phone" placeholder="请输入库房电话"></el-input>
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
savestorage
} from "@/api/equipmentmaterial";

const defaultData={
  code:'',
  name:'',
  unit:'',
  keeper:'',
  area:'',
  type:'',
  level:'',
  phone:'',
  remark:''
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      },
      levelItems:[
        {id:'一级',name:'一级'},
        {id:'二级',name:'二级'},
        {id:'三级',name:'三级'},
      ],
      typeItems:[
         {id:'临时仓库',name:'临时仓库'},
        {id:'长期仓库',name:'长期仓库'},
        {id:'冷库',name:'冷库'},
      ]
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
           const params= "?storage.code="+ this.form.code
           +"&storage.name="+this.form.name
           +"&storage.unit="+this.form.unit
           +"&storage.keeper="+this.form.keeper
           +"&storage.area="+this.form.area
           +"&storage.type="+this.form.type
           +"&storage.level="+this.form.level
           +"&storage.phone="+this.form.phone
          +"&storage.remark="+this.form.remark;
          savestorage(params)
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