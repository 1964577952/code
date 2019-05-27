<template>
<el-dialog 
           title="我的信息" 
        
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
          >
    <div class="components-container">
        <el-form  label-width="70px">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div style="width:100%;margin-left:-25px;">
                <el-row :gutter="20">
                  
                    <el-col :span="8">
                        <el-form-item label="账号">
                         {{account.userName}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="昵称">
                         {{account.nickName}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="头像">
                            <img :src="account.avatar" >
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                        <el-form-item label="姓名">
                         {{worker.name}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="性别">
                         {{worker.sex}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="生日">
                           {{worker.birth}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                        <el-form-item label="学历">
                         {{worker.education}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="职位">
                         {{worker.duty}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="专长">
                           {{worker.major}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                        <el-form-item label="手机号">
                         {{worker.phone}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="单位">
                         {{worker.unitname}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="工作时间">
                           {{worker.workDate}}
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
 getUserInfo
} from "@/api/login";
import store from '@/store'
const defaultAccount={
    userName:'',
    avatar :'',
    nickName :'',
};
const defaultWorker={
    address:'',
    birth :'',
    duty :'',
    education:'',
    email:'',
    major:'',
    name:'',
    nation:'',
    nativePlace:'',
    phone:'',
    sex:'',
    title:'',
    unitname:'',
    workDate:'',
};

export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      account: Object.assign({}, defaultAccount), 
      worker:Object.assign({}, defaultWorker), 
      isLoading: false,
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
        this.fetchData();
    },
    //获取默认数据
    fetchData(val) {
   
       this.account={};
       this.worker={};
        getUserInfo()
        .then(response => {
        //绑定分页列表
        this.account =  response.data.account;
        this.account.avatar ="http://211.159.176.177:88/"+this.account.avatar
        if(response.data.worker!=null){
 this.worker = response.data.worker;
        }
       
        })
        .catch(err => {
        this.listLoading = false;
       
        console.log(err);
        });
       
    },
  }
};
</script>