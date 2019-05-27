<template>
<el-dialog 
           title="创建角色" 
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
                        <el-form-item label="角色名称" >
                           <el-input v-model="form.name" placeholder="请输入角色名称"></el-input>
                        </el-form-item>
                    </el-col>
                   
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="24">
                        <el-form-item label="选择权限" >
                          <el-tree
                                :data="datatree"
                                node-key="id"
                                ref="tree" 
                                :default-expand-all="true" 
                                :expand-on-click-node="false"
                                :highlight-current ="true"
                                :props="defaultProps" 
                                show-checkbox
                             >
                          </el-tree>
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
saverole,
getmenupage
} from "@/api/system";
import JsTreeList from "js-tree-list"
const defaultData={
  name :'',
  menu:'',
};


export default {
  data() {

    return {
      dialogFormVisible: false, //弹出页面控制
      form: Object.assign({}, defaultData), //表单信息
      isLoading: false,
      rules: {
      },
       datatree: [],
        defaultProps: {
          children: 'children',
          label: 'name',
          value:''
        },
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
    },
    //获取默认数据
    fetchData() { 
       getmenupage({ps:999,p:1})
        .then(response => {
          //绑定分页列表
          this.list =  response.data.menuPage.list;
          this.total = response.data.menuPage.totalRow;
          const tree = new JsTreeList.ListToTree(this.list, {
            key_id: "id",
            key_parent: "pId",
            key_child: "children",
            key_label: "name"
            }).GetTree()
            this.datatree = tree;
           // console.log(tree);
          //关闭load
          this.listLoading = false;
        })
        .catch(err => {
          this.listLoading = false;
          console.log(err);
        });
    },
    submitForm(formName) {
      var  rolemenu='';
    
       var halfcheckMunu=this.$refs.tree.getHalfCheckedNodes();
      halfcheckMunu.forEach(element => {
          rolemenu += element.router+",";
      });
        var checkMenu=this.$refs.tree.getCheckedNodes();
      checkMenu.forEach(element => {
          rolemenu += element.router+",";
      });
     
      if(rolemenu.length>0){

          rolemenu= rolemenu.substr(0,rolemenu.length-1);
      }
      this.form.menu=rolemenu;
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.isLoading = true;
           const params= "?role.name="+ this.form.name
             +"&role.menu="+this.form.menu ;
          saverole(params)
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