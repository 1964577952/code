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
                        <el-form-item label="训练类别" prop="type">
                           <el-input v-model="form.type" placeholder="请输入训练类别"></el-input>
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
               <el-button type="primary"  v-if="isSave" @click="submitForm()" :loading="isLoading">确定</el-button>
            </div>
           
        </el-form>
    </div>
</template>
<script>
import {
 updatedrilltype,
 editdrilltype,
 getdrilltypepage
} from "@/api/training";

const defaultData={
    type:"",
    remark:"",
    pId:"",
    id:""
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      parentTypeItems:[],
       isSave:false,
      rules: {
        type: [
          { required: true, message: "日常训练类型必填", trigger: "blur" }
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
        
       this.form=Object.assign({}, defaultData);
        let page = this;
        page.dialogFormVisible = true;
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }
        
        if(val !=null && val != undefined){
            this.fetchData(val);
             getdrilltypepage({pId:0})
            .then(response => {
              this.parentTypeItems =  response.data.drillTypePage.list;
            })
            .catch(err => {
              console.log(err);
            });
        }

        
        
    },
    //获取默认数据
    fetchData(val) {
      editdrilltype({id:val})
        .then(response => {
           this.form=response.data.drillType;
            this.isSave =true;
        })
        .catch(err => {
            this.isLoading = false;
        });
    },

    
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isLoading = true;
          if(this.form.pId==null){
              this.form.pId = 0;
          }
          const params= "?drillType.id="+this.form.id
          +"&drillType.pId="+this.form.pId
          +"&drillType.type="+ this.form.type
          +"&drillType.remark="+this.form.remark;
          
          updatedrilltype(params)
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