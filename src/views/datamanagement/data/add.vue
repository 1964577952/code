<template>
<el-dialog 
           title="创建资料" 
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
                        <el-form-item label="资料类型" >
                           <el-select  v-model="form.dataTypeId" placeholder="请选择资料类型"  style="width:250px">
                              <el-option
                                v-for="item in dataTypeItems"
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
                        <el-form-item label="资料名称" >
                            <el-input v-model="form.name" placeholder="请输入资料名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="附件" >
                          <el-upload
                          class="upload-demo"
                          action="http://211.159.176.177:88/rescue/upload/save?uploadType=data"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove"
                          :before-remove="beforeRemove"
                          :on-success="handleSuccess"
                           :with-credentials='true'
                           :headers="headers"
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
savedata,
 getdataTypepage,
  findtree
} from "@/api/datamanagement";
import Cookies from 'js-cookie';

const defaultData={
  dataTypeId:'',
  name:'',
  remark:'',
  uploadId:0,
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      fileList:[],
      dataTypeItems:[],
      rules: {
      },
      headers:{
         
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
     
        let page = this;
        page.dialogFormVisible = true;
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }
        this.form =  Object.assign({}, defaultData);
         this.fileList=[];
    },
    //获取默认数据
    fetchData() {
     this.getdataTypeItems();
    },
    getdataTypeItems(){
       findtree({findType:'listallleaf'})
        .then(response => {
            this.dataTypeItems =  response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
     handleRemove(file, fileList) {
        this.form.uploadId = 0;
        console.log(file, fileList);
      },
      handlePreview(file) {
        window.open("http://211.159.176.177:88/"+file.url);

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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?data.dataTypeId="+ this.form.dataTypeId
           +"&data.name="+this.form.name
           +"&data.uploadId="+this.form.uploadId
          +"&data.remark="+this.form.remark;
          savedata(params)
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
    refreshCurrentData(){
            this.$emit("refreshCurrentData");
        },
    onSubmit() {},
    handleChange(val) {}
  }
};
</script>