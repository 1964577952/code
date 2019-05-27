<template>
<el-dialog 
           title="查看人员" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
    <div class="components-container">
        <el-form ref="form" :model="form"  label-width="156px">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div style="width:100%;margin-left:-25px;">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="员工号" prop="number">
                            {{form.worker.number}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名">
                         {{form.worker.name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别">
                            {{form.worker.sex}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="手机号" prop="phone">
                            {{form.worker.phone}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="16">
                        <el-form-item label="单位-部门" prop="unitId">
                            {{form.worker.unitId}}
                        </el-form-item>
                    </el-col>
                  
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学历" >
                            {{form.worker.education}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职务" prop="duty">
                             {{form.worker.duty}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职称" prop="title">
                             {{form.worker.title}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="生日" prop="birth">
                            {{form.worker.birth}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="登录账号">
                            {{form.worker.accountId}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="民族">
                             {{form.worker.nation}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="身份证号">
                             {{form.worker.idcode}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="籍贯">
                            {{form.worker.nativePlace}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="参加工作日期">
                             {{form.worker.workDate}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                           {{form.worker.email}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="专业">
                            {{form.worker.major}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="家庭住址">
                             {{form.worker.address}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注">
                             {{form.worker.remark}}
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
 workersave
} from "@/api/personne";

const defaultData={
   worker:{

   }
};

import {
 workershow
} from "@/api/personne";
export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
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
    showData(val) {
        let page = this;
        page.dialogFormVisible = true;
        if (page.$refs['form'] !== undefined) {
            page.$refs['form'].resetFields();
        }
        this.fetchData(val);
    },
    //获取默认数据
    fetchData(val) {
        this.form.worker ={};
       if(val!=undefined){

        workershow({
                    id: val,
                })
        .then(response => {
        //绑定分页列表
        this.form =  response.data;
        
        })
        .catch(err => {
        this.listLoading = false;
        console.log(err);
        });
       }
       
    },
   
  
    handleChange(val) {}
  }
};
</script>