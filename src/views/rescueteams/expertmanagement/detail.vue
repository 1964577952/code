<template>
<el-dialog 
           title="查看专家" 
           custom-class="personDialog" 
           :close-on-click-modal="false" 
           :visible.sync="dialogFormVisible"
           :fullscreen="true" style="width:100%;height:100%;padding:20px;">
    <div class="components-container">
        <el-form ref="form" :model="form" label-width="156px">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div style="width:100%;margin-left:-25px;">
                <el-row :gutter="20">
                    <el-col :span="8">
                        
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="姓名" >
                            {{form.name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别">
                            {{form.sex}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="手机号">
                            {{form.phone}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="所属单位">
                             {{form.unit}}
                        </el-form-item>
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="生日" >
                             {{form.birth==null?null:strformatDate(form.birth,'yyyy-MM-dd')}}
                        </el-form-item>

                    </el-col>
                  
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="学历"  >
                            {{form.education}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                         <el-form-item label="专业">
                              {{form.major}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职称" >
                            {{form.title}}
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="邮箱">
                             {{form.email}}
                        </el-form-item>

                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="特长">
                             {{form.speciality}}                            
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" >
                        <el-form-item label="联系地址">
                             {{form.address}}
                        </el-form-item>
                    </el-col>
                </el-row>
               
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="备注">
                             {{form.remark}}
                        </el-form-item>
                    </el-col>
                    
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="简历">
                             {{form.resume}}                             
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


const defaultData={
   expert:{

   }
};

import {
 expertshow
} from "@/api/personne";
import { strformatDate } from "@/utils/common";
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
        this.form.expert ={};
       if(val!=undefined){

        expertshow({
                    id: val,
                })
        .then(response => {
        //绑定分页列表
        this.form =  response.data.expert;
        
        })
        .catch(err => {
        this.listLoading = false;
        console.log(err);
        });
       }
       
    },
   
   strformatDate: function(strdate, fmt) {
      return strformatDate(strdate, fmt);
    },
    handleChange(val) {}
  }
};
</script>