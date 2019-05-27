<template>
<el-dialog 
           :title ="titles"
           :visible.sync="dialogFormVisible">
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="90px"  @submit.prevent="onSubmit">
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="厂家" prop="factory">
                            <el-input v-model="form.factory" placeholder="请输入厂家"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出厂日期" prop="productionDate">
                          <el-date-picker v-model="form.productionDate" type="date"  value-format ="yyyy-MM-dd" format="yyyy-MM-dd" placeholder="请选择参加工作日期" >
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <el-form-item label="有效期" prop="validity">
                            <el-input-number v-model="form.validity" style="width:110px;"  :step="1" :min="0" :max="9999"></el-input-number>天
                        </el-form-item>
                         
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="数量" >
                          <el-input-number v-model="form.quantity" style="width:120px;"  :step="1" :min="0" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="编码" prop="equipmentCode">
                         <el-input v-model="form.equipmentCode" placeholder="请输入编码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                     <el-col :span="12">
                        <el-form-item label="库房" >
                          <el-select v-model="form.storageId " placeholder="请选择库房" style="width:220px">
                                <el-option
                                v-for="item in storageItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        <el-form-item label="是否储备" >
                           <el-radio-group v-model="form.isReserve">
                                <el-radio label="1" key="1">是</el-radio>
                                <el-radio label="0" key="0">否</el-radio>
                            </el-radio-group>
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
saveequipmentInOut,
 getequipmentpage,
 getstoragepage,
 showequipment
} from "@/api/equipmentmaterial";
const defaultData={
  factory:"",
  productionDate:"",
  equipmentCode:"",
  validity:0,
  quantity:0,
  storageId:null,
  isReserve:"1",
  remark:"",
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
        factory: [
            { required: true, message: '厂家必填', trigger: 'blur' },
          ],
          productionDate: [
            { required: true, message: '出厂日期必填', trigger: 'blur' },
          ], 
          validity: [
            { required: true, message: '有效期必填', trigger: 'blur' },
          ], equipmentCode: [
            { required: true, message: '编码必填', trigger: 'blur' },
          ],
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
    showData(val,inout) {
        this.inout =inout;
        this.titles = this.inout== 0 ? '出库':'入库'
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
     this.getstorageItems();
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
     //获取分页数据
    getstorageItems() {
   
      getstoragepage(this.query)
        .then(response => {
          //绑定分页列表
          this.storageItems =  response.data.storagePage.list;
      
        })
        .catch(err => {
      
          console.log(err);
        });
    },
    
    
 
    submitForm(formName) {
      
   
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?equipmentInOut.equipmentId="+ this.equipment.id
           +"&equipmentInOut.equipmentCode="+this.form.equipmentCode
           +"&equipmentInOut.quantity="+this.form.quantity
           +"&equipmentInOut.factory="+this.form.factory
           +"&equipmentInOut.productionDate="+this.form.productionDate
           +"&equipmentInOut.validity="+this.form.validity
           +"&equipmentInOut.inout="+this.inout
           +"&equipmentInOut.isReserve="+this.form.isReserve
           +"&equipmentInOut.storageId="+this.form.storageId
          +"&equipmentInOut.remark="+this.form.remark;
          saveequipmentInOut(params)
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