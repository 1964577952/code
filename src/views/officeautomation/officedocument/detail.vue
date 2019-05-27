<template>
<el-dialog 
           title="查看公文" 
          
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="120px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公文标题" >
                           {{form.title}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公文内容" >
                            {{form.content}}
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="12">
                        <el-form-item label="发布部门" >
                             {{form.publish}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="接收部门" >
                             {{form.receiver}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="附件" >
                           <el-upload
                          class="upload-demo"
                          action="http://211.159.176.177/rescue/upload/save?uploadType=watermark"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :before-remove="beforeRemove"
                          :on-success="handleSuccess"
                           :with-credentials='true'
                        
                          multiple
                          :limit="1"
                          :on-exceed="handleExceed"
                          :file-list="fileList">
                        </el-upload>
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
               <el-button type="info"  @click="dialogFormVisible = false">关闭</el-button>
            </div>
           
        </el-form>
    </div>
      </el-dialog>
</template>
<script>
import {
editofficeDocument,
updateofficeDocument
} from "@/api/officeautomation";
import {
 getunitpage,
  findtree
} from "@/api/basicconfiguration";
const defaultData={
  title:'',
  content:'',
  accountId:0,
  publishId:0,
  publishName:'',
  receiverId:0,
  uploadId:0,
  remark:''
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
           fileList:[],
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
          this.fileList=[];
    },
    //获取默认数据
    fetchData(val) {
       
         editofficeDocument({id:val})
        .then(response => {
           this.form=response.data.officeDocument;
          if(this.form.uploadId != 0 && this.form.uploadId != null){
                this.fileList=[{url: this.form.uploadurl, name: this.form.uploadname}];
                console.log(this.fileList);
           }
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
     handleRemove(file, fileList) {
        this.form.uploadId = 0;
        console.log(file, fileList);
      },
      handlePreview(file) {
         window.open("http://211.159.176.177/"+file.url);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(response, file, fileList) {
      if(response.msg=='上传成功'){
          this.form.uploadId=response.id;
      }
     },

    handleChange(val) {}
  }
};
</script>