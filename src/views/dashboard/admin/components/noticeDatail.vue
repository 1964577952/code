<template>
<el-dialog 
           title="查看通知公告" 
          
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="120px" >
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="通知公告标题" >
                             {{form.title}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型" >
                            {{form.type}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="内容" >
                             {{form.content}}
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="发布部门" >
                             {{form.publishId}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接收部门" >
                             {{form.receiverId}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="附件" >
                            {{form.url}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注" >
                             {{form.remark}}
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
editnotice,
updatenotice
} from "@/api/officeautomation";
import {
 getunitpage,
 findtree
} from "@/api/basicconfiguration";
const defaultData={
  
};


export default {
  data() {

    return {
      unitItems:null,
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      },
        typeItems:[
          {id:0,name:'通知'},
          {id:0,name:'公告'},
      ] 
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
         editnotice({id:val})
        .then(response => {
           this.form=response.data.notice;
          
        })
        .catch(err => {
            this.isLoading = false;
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