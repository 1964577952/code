<template>
<el-dialog 
           title="编辑用户" 
          
           :visible.sync="dialogFormVisible"
         >
    <div class="components-container">
        <el-form ref="form" :model="form" :rules="rules"  label-width="156px"  @submit.prevent="onSubmit">
    
            <template slot="title">
                <div class="searchtitle">
                    <svg-icon icon-class="tabcol" />基本信息
                </div>
            </template>
            <div>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="用户名" >
                           <el-input v-model="form.userName" placeholder="请输入用户名"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
               
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="昵称" >
                           <el-input v-model="form.nickName" placeholder="请输入昵称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                 <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="角色"  prop="roleid">
                             <el-select  v-model="roleid"  placeholder="请选择角色" style="width:140px;" >
                              <el-option
                                label="请选择"
                                :value="null">
                              </el-option>
                              <el-option
                                v-for="item in roleItems"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                              </el-option>
                             </el-select>
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
editaccount,
updateaccount,
 getrolepage,
 addRole,
 assignRoles
} from "@/api/system";

const defaultData={
  
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      roleid:null,
      rules: {
        // roleid:[{ required: true, message: '请选择', trigger: 'change' },]
      },
      stateItems:[
          {id:1,name:'有效'},
          {id:0,name:'无效'}
      ],
        roleItems:[]
        
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
       getrolepage({ps:999,p:1})
        .then(response => {
          //绑定分页列表
          this.roleItems =  response.data.rolePage.list;
      
        
        })
        .catch(err => {
        
          console.log(err);
        });
        assignRoles({id:val})
        .then(response => {
          //绑定分页列表
            var role=response.data.roleList.find(x=>x.assigned);
            if(role)
             {
               this.roleid =  role.id;
             }
             else
             {
               this.roleid = null;
             }
        })
        .catch(err => {
        
          console.log(err);
        });
        
         editaccount({id:val})
        .then(response => {
           this.form=response.data.account;
           this.form.password ='';
        })
        .catch(err => {
            this.isLoading = false;
        });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(!this.roleid)
          {
            this.$message.error("请选择");
            return;
          }
           console.log(this.roleid);
           if(this.roleid != null){
            
            addRole({accountId:this.form.id,roleId:this.roleid})
            .then(response => {
             
            })
            .catch(err => {
             
            });
           }
           this.isLoading = true;
            const params= "?userName="+ this.form.userName
             +"&id="+this.form.id
            
             +"&nickName="+this.form.nickName;

         
          updateaccount(params)
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