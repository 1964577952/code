<template>
<el-dialog 
           title="创建公文" 
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
                           <el-input v-model="form.title" placeholder="请输入公文标题"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="公文内容" >
                            <el-input v-model="form.content"  type="textarea" :rows="2" placeholder="请输入公文内容"></el-input>
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
                            <el-select  v-model="form.receiverId"  >
                              <el-option label="选择接收部门" value=""></el-option>
                              <el-option
                                v-for="item in unitItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="附件" >
                           <el-upload
                          class="upload-demo"
                          action="http://211.159.176.177:88/rescue/upload/save?uploadType=office_document"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :before-remove="beforeRemove"
                          :on-success="handleSuccess"
                           :with-credentials='true'
                        
                          multiple
                          :limit="1"
                          :on-exceed="handleExceed"
                          :file-list="fileList">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注" >
                            <el-input v-model="form.remark"  type="textarea" :rows="2" placeholder="请输入备注"></el-input>
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
saveofficeDocument
} from "@/api/officeautomation";

import {
 getunitpage,
 findtree
} from "@/api/basicconfiguration";
const defaultData={
  title:'',
  content:'',
  accountId:'',
  publishId:'',
  publish:'',
  receiverId:'',
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
    
    console.log( this.form);
    
    
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
        this.form.publish =this.$store.getters.unitname;
        this.form.publishId =this.$store.getters.unitId;
         this.fileList=[];
    },
    //获取默认数据
    fetchData() {
     this.getunitItems();
    },
    //获取分页数据
    getunitItems() {
     findtree({findType:'listalltree'})
        .then(response => {
          this.unitItems =  response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?officeDocument.title="+ this.form.title
          +"&officeDocument.content="+this.form.content
          +"&officeDocument.uploadId="+this.form.uploadId
          +"&officeDocument.publishId="+this.form.publishId
          +"&officeDocument.receiverId="+this.form.receiverId
          //+"&officeDocument.createAt="+this.form.createAt
          //+"&officeDocument.url="+this.form.url
          //+"&watermark.url="+this.form.url
          +"&officeDocument.remark="+this.form.remark;
          saveofficeDocument(params)
            .then(response => {
              this.$message({
                message: "操作成功",
                type: "success"
              });
               this.fileList=[];
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
    refreshCurrentData(){
            this.$emit("refreshCurrentData");
        },
    onSubmit() {},
    handleChange(val) {}
  }
};
</script>