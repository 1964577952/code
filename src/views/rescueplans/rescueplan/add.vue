<template>
<el-dialog 
           title="创建预案" 
           :visible.sync="dialogFormVisible"
          >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div >
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="事故类型" prop="type">
                           <el-select  v-model="form.accidentTypeId" placeholder="请选择事故类型" >
                              <el-option
                                v-for="item in accidentTypeItems"
                                :key="item.id"
                                :label="item.type"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>   
                     <el-col :span="12">
                        <el-form-item label="事故等级" >
                          <el-select  v-model="form.level" placeholder="请选择事故等级" >
                              <el-option
                                v-for="item in levelItems"
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
                        <el-form-item label="遇难人数" >
                           <el-input-number v-model="form.wreckNum" style="width:120px"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="遇险人数" >
                           <el-input-number v-model="form.distressNum" style="width:120px"  :step="1" :max="1000"></el-input-number>
                        </el-form-item>
                    </el-col>
                     
                </el-row>
                <el-row :gutter="20">
       
                   
                     <el-col :span="12">
                        <el-form-item label="企业类型" >
                           <el-select  v-model="form.enterprisesType" placeholder="请选择企业类型" >
                              <el-option
                                v-for="item in enterprisesTypeItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                     <el-col :span="12">
                        
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="预案装备" >
                             <el-input v-model="form.equipment"   placeholder="请输入案例装备"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="预案专家" >
                           <el-input v-model="form.expert"   placeholder="请输入案例专家"></el-input>
                           
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                  
                    <el-col :span="24">
                        <el-form-item label="处理过程" >
                           <el-input v-model="form.treatmentProcess"  type="textarea" :rows="2" placeholder="请输入处理过程"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                 
            </div>
           <div style="padding:10px;text-align:center">
               <el-button type="primary" @click="submitForm()" :loading="isLoading">确定</el-button>
               <el-button type="info"  @click="dialogFormVisible = false">取消</el-button>
            </div>
           
        </el-form>
    </div>
      </el-dialog>
</template>
<script>
import {
 saverescuePlan,
} from "@/api/rescueplans";
import {
 getaccidentTypepage,
} from "@/api/basicconfiguration";
const defaultData={
   
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      accidentTypeItems:null,
      levelItems:[
         {id:'告警',name:'告警'},
         {id:'提示',name:'提示'},
      ],
       enterprisesTypeItems:[
          {id:'国有',name:'国有'},
          {id:'合作',name:'合作'},
          {id:'合资',name:'合资'},
          {id:'独资',name:'独资'},
          {id:'集体',name:'集体'},
          {id:'私营',name:'私营'},
          {id:'个体工商户',name:'个体工商户'},
          {id:'报关',name:'报关'},
          {id:'其他',name:'其他'},
      ],
      expertItems:[{id:'aaa',name:'aaa'},],
      equipmentItems:[{id:'aaa',name:'aaa'},],
      rules: {
        // type: [
        //   { required: true, message: "日常训练类型必填", trigger: "blur" }
        // ]
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
       this.form=Object.assign({}, defaultData);
        let page = this;
        page.dialogFormVisible = true;
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }

      this.getaccidentTypeItems();
    },
    //获取默认数据
    fetchData() {
      
      
    },

     getaccidentTypeItems(){
        getaccidentTypepage({})
        .then(response => {
            this.accidentTypeItems =  response.data.accidentTypePage.list;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;
        
          const params= "?rescuePlan.accidentTypeId="+this.form.accidentTypeId
          +"&rescuePlan.level="+ this.form.level
          +"&rescuePlan.enterprisesType="+ this.form.enterprisesType
          +"&rescuePlan.distressNum="+ this.form.distressNum
          +"&rescuePlan.wreckNum="+ this.form.wreckNum
          +"&rescuePlan.equipment="+ this.form.equipment
          +"&rescuePlan.expert="+ this.form.expert
          +"&rescuePlan.treatmentProcess="+this.form.treatmentProcess;
          
          saverescuePlan(params)
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