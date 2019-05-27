<template>
<el-dialog 
           title="查看计划" 
          
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="计划类别" >
                            {{form.typeId}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="计划时长" >
                            {{form.duration}}
                        </el-form-item>
                    </el-col>
                </el-row>
            
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="计划标题" >
                            {{form.title}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="计划内容" >
                            {{form.content}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                       <el-form-item label="计划时间"  >
                           {{form.startDate}} 至 {{form.endDate}}
                        </el-form-item>
                    </el-col>
                </el-row>
            </div>
           <div style="padding:10px;text-align:center">
               <el-button type="info"  @click="dialogFormVisible = false">取消</el-button>
            </div>
           
        </el-form>
    </div>
      </el-dialog>
</template>
<script>
import {
editplan,
updateplan,
getplanTypepage
} from "@/api/plan";

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
       planTypeItems:null,
        
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
        this.geteditplan(val);
    },
    geteditplan(val){
      editplan({id:val})
        .then(response => {
           this.form=response.data.plan;
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
    onSubmit() {},
    handleChange(val) {}
  }
};
</script>